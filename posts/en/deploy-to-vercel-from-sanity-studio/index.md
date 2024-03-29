---
title: "Deploy to Vercel from Sanity Studio"
excerpt: "If you need to manually trigger a new deploy from Sanity Studio, then you may want to have a quick button for that."
created_at: 2020-05-12T00:00:00.000Z
lang: en
---

By default, Sanity studio comes with `sanity-plugin-dashboard-widget-netlify` which is very easy to use. I've recently moved my website to Vercel. I wanted to have a widget like that. There is one out there but it was hard to configure and somehow buggy. So I made my own widget. It's not released anywhere. I'll just pour the source code in this post. Feel free to grab them and release it if you want. Just mentioning this post will be enough for me.

![Sanity Studio](./sanity.png)

We need to install this dependency.

```Bash
npm install node-fetch
# or
yarn add node-fetch
```

Let's name our widget `dashboard-widget-deploy-vercel`. Let's register it in the config file.

`sanity.json`

```json
"plugins": [
  "@sanity/base",
  ...
  "dashboard-widget-deploy-vercel"
],
```

And we also need it in `dashboardConfig.js` to display it.

`src/dashboardConfig.js`

```javascript
export default {
  widgets: [
    ...
    { name: 'deploy-vercel' },
    ...
  ]
}
```

And a bunch of more files!

↓ `plugins/dashboard-widget-deploy-vercel/sanity.json`

```javascript
{
  "parts": [
    {
      "implements": "part:@sanity/dashboard/widget",
      "path": "./index.js"
    }
  ]
}
```

↓ `plugins/dashboard-widget-deploy-vercel/index.js`

```javascript
import DeplyVercel from './DeployVercel'
export default {
  title: 'MyTool',
  name: 'deploy-vercel',
  component: DeplyVercel,
}
```

↓ `plugins/dashboard-widget-deploy-vercel/DeployVercel.css`

```css
.container {
  background-color: #fff;
}
.header {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(23, 23, 23, 0.1);
}
.header h2 {
  margin: 0;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  line-height: 1.1em;
}
.button {
  margin: 2rem 0 0.5rem 1.5rem;
  font-size: 1rem;
  padding: 8px 16px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fafafa;
  cursor: pointer;
}
.button:hover {
  background: #eee;
}
.list {
  padding-bottom: 1rem;
}
.list li p {
  margin: 0.5rem 0;
}
```

↓ `plugins/dashboard-widget-deploy-vercel/DeployVercel.js`

```javascript
import React, { useState, useEffect, useRef } from 'react'
import fetch from 'node-fetch'
// https://github.com/css-modules/css-modules
import styles from './DeployVercel.css'
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval (callback, delay) {
  const savedCallback = useRef()
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
const DeployVercel = () => {
  const [deploying, setDeploying] = useState(false)
  const [jobId, setJobId] = useState(null)
  const [deployments, setDeployments] = useState([])
  const updateList = () => {
    // https://vercel.com/docs/api?query=api#endpoints/deployments/list-deployments
    fetch('https://api.zeit.co/v5/now/deployments?limit=5', {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_VERCEL_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(json => setDeployments(json.deployments))
  }
  useEffect(() => {
    updateList()
  }, []) // update the list initially
  useInterval(() => {
    if (!jobId) {
      return
    }
    updateList()
  }, 5000)
  const deploy = () => {
    setDeploying(true)
    // https://vercel.com/docs/v2/more/deploy-hooks?query=deploy%20hoo#triggering-a-deploy-hook
    fetch(process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK, { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        setJobId(json.job.id)
        updateList()
      })
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Deploy to Vercel</h2>
      </header>
      <button className={styles.button} type='button' onClick={deploy} disabled={deploying}>
        {deploying ? 'Deploying...' : 'Deploy'}
      </button>
      <ol className={styles.list}>
        {deployments.map(deployment => (
          <li key={deployment.uid}>
            <p>
              {new Date(deployment.created).toLocaleString()} ({deployment.state})
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
export default DeployVercel
```

Okay, all set. The last thing you need to do is to set up two environment variables

- SANITY_STUDIO_VERCEL_DEPLOY_HOOK: Your Project → Settings → Git Integration
- SANITY_STUDIO_VERCEL_TOKEN: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)

Create `.env.development` file and, of course, add it to `.gitignore`. And finally, add the variables on Vercel.

Let me know how it goes.

