---
title: "Create Social Image in Sanity Studio"
excerpt: "If you're usig Sanity Studio, you can create social image right inside it."
created_at: 2020-10-12T00:00:00.000Z
lang: en
---

Last time, I [posted](/post/en/create-social-image-using-puppeteer) about how to create social image using Puppeteer. If you haven't read it, I recommend you to give it a read. Now in this post, I'm going to put things together in your Sanity studio.

In this article, I assume you have a mini webpage like [https://eunjae-stuff.vercel.app/blog-image.html?title=Hello&description=world](https://eunjae-stuff.vercel.app/blog-image.html?title=Hello&description=world)​. If not, read [the previous post](https://eunjae.dev/post/create-social-image-using-puppeteer). And I host my Sanity studio in Vercel and use its serverless function, but it won't be too much different if you're using Netlify (Just a little bit here and there).

Let's create `api/create-image.js`.

```javascript
const handler = async (req, res) => {
  const { id, title, description } = req.body
  const filePath = await createImage(title, description)
  await uploadToSanity(id, filePath)
  res.status(200)
}

export default handler
```

So here's what we're going to do. We will create an image with a title and a description. The image will be stored as a file somewhere temporarily. We upload the image to Sanity server and set the id of the asset to my document (blog post).

## 1. createImage()

It's no different from what was explained in the previous post.

```javascript
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import tempfile from 'tempfile'

async function createImage(title, description) {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: [...chrome.args, `--window-size=2560,1440`],
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })
  const page = await browser.newPage()
  page.goto(
    `https://eunjae-stuff.vercel.app/blog-image.html?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(description)}`
  )
  await page.waitForFunction(`window.done === true`)
  const filePath = tempfile('.png')
  await page.screenshot({
    path: filePath,
    clip: { x: 0, y: 0, width: 1200, height: 628 },
  })
  await browser.close()
  return filePath
}
```

[tempfile](https://github.com/sindresorhus/tempfile) is a library that returns a path of a temporary file. It opens up [https://eunjae-stuff.vercel.app/blog-image.html?.](https://eunjae-stuff.vercel.app/blog-image.html?.).. and takes a screenshot of it. Nothing special here.

## 2. uploadToSanity()

```javascript
// eslint-disable-next-line import/no-extraneous-dependencies
import sanityClient from '@sanity/client'
import { basename } from 'path'
import { createReadStream } from 'fs'
import config from '../sanity.json'

async function uploadToSanity(id, filePath) {
  const client = sanityClient({
    projectId: config.api.projectId,
    dataset: config.api.dataset,
    token: process.env.SANITY_STUDIO_WRITE_TOKEN,
    useCdn: false,
  })

  await client.assets
    .upload('image', createReadStream(filePath), {
      filename: basename(filePath),
    })
    .then(imageAsset => {
      return client
        .patch(id)
        .set({
          metaImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id,
            },
          },
        })
        .commit()
    })
}
```

We need an environment variable `SANITY_STUDIO_WRITE_TOKEN`. Make sure you get a "write" token and set it to your serverless function host like Vercel or Netlify, (or, .env if testing locally).

As you can see above, I have `metaImage` field in my `post` schema.

```javascript
{
  name: 'metaImage',
  type: 'image',
  title: 'Meta Image',
},
```

It uploads the image to Sanity. Once it's done, it updates the document with the asset id.

## Who is calling this API?

Okay then, who is calling this API? Sanity provides [Document Actions API](https://www.sanity.io/docs/document-actions-api). I added an action named "Generate Meta Image". The simplest implementation would be

- You click the button.
- It grabs id, title and description.
- It calls the API.

However, I've got a problem which is a single word alone on the second sentence.

[Alex Clark on Twitter](https://twitter.com/AlexClark_NZ/status/1313389687537430529)

So I needed a bit of manual process to fix things. Here's the final look:

![Demo](./demo.gif)

I'm not going to bore you with all the details about [Document Actions API](https://www.sanity.io/docs/document-actions-api). Instead, here comes a bunch of snippets that you can copy&paste right now.

↓ `sanity.json`

```json
{
  ...
  "parts": [
    ...
    {
      "implements": "part:@sanity/base/document-actions/resolver",
      "path": "./actions/resolveDocumentActions.js"
    }
  ]
}
```

↓ `actions/resolveDocumentActions.js`

```javascript
// eslint-disable-next-line import/no-unresolved

import defaultResolve from 'part:@sanity/base/document-actions'
import { GenerateMetaImage } from './GenerateMetaImage'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), GenerateMetaImage]
}
```

↓ `actions/GenerateMetaImage/index.js`

```javascript
import React, { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import MdPhoto from 'react-icons/lib/md/photo'
// eslint-disable-next-line import/no-unresolved
import styles from './index.css'

function toPlainText(blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

function Form({
  docId,
  title: initialTitle,
  description: initialDescription,
  onComplete,
}) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [generating, setGenerating] = useState(false)
  return (
    <div className={styles.container}>
      <p className={styles.label}>Title</p>
      <textarea
        className={styles.input}
        type="text"
        value={title}
        onChange={event => {
          setTitle(event.target.value)
        }}
      ></textarea>
      <p className={styles.label}>Description</p>
      <textarea
        className={styles.input}
        type="text"
        value={description}
        onChange={event => {
          setDescription(event.target.value)
        }}
      ></textarea>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          setGenerating(true)
          fetch('https://<INSERT-YOUR-DOMAIN-HERE>/api/create-image', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              id: docId,
              title,
              description,
            }),
          }).then(onComplete)
        }}
        disabled={generating}
      >
        {generating ? 'Generating...' : 'Generate Image'}
      </button>
    </div>
  )
}

export function GenerateMetaImage({ draft, published, onComplete }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [docId, setDocId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  return {
    label: 'Generate Main Image',
    icon: MdPhoto,
    onHandle: () => {
      setTitle((draft || published).title)
      const { excerpt } = draft || published
      setDescription(toPlainText(excerpt))
      setDocId((draft || published)._id)
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'modal',
      onClose: onComplete,
      content: (
        <Form
          docId={docId}
          title={title}
          description={description}
          onComplete={onComplete}
        />
      ),
    },
  }
}
```

↓ `actions/GenerateMetaImage/index.css`

```css
.container {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.8125rem;
  line-height: 1.23077;
  font-weight: 600;
  color: rgb(33, 43, 57);
  margin-bottom: 0.5rem;
}
.input {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(33, 43, 57);
  border: 1px solid rgb(174, 184, 200);
  border-radius: 2px;
  line-height: 1.25;
  padding: calc(0.75rem - 3px) calc(0.75rem - 1px) calc(0.75rem - 2px);
}
.button {
  margin-top: 2rem;
  width: 10rem;
  align-self: flex-start;
  padding: calc(0.75em - 1px);
  border: 1px solid rgba(93, 113, 145, 0.35);
  border-radius: 4px;
  color: rgb(93, 113, 145);
  font-size: 1rem;
  font-weight: 400;
  background-color: #fff;
}
.button:hover:not(:disabled) {
  color: rgb(255, 255, 255);
  background-color: rgb(84, 102, 131);
}
.button:disabled {
  cursor: not-allowed;
}
```

I hope this helps! I'd like to see how you've done with your social images no matter if it's done with this guide or not. Feel free to share yours with me. I'm curious 🙂

[Eunjae Lee on Twitter](https://twitter.com/eunjae_lee/status/1316121157184217088)

