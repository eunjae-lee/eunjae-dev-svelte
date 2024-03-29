---
title: "Add Super Fast Search in Your Gatsby Website"
excerpt: "This post explains the whole flow from indexing data to building search UI on your Gatsby website."
created_at: 2019-01-12T00:00:00.000Z
lang: en
---

> Edited @ 5 June 2022
>
> This post is outdated, especially with Autocomplete.js. Its new major version has been released. Check out [the repository](https://github.com/algolia/autocomplete).

Let's add super fast search feature from Algolia to your Gatsby website. Here are the steps:

1. Setup your account at Algolia
2. Make your Gatsby build script to upload contents to Algolia
3. Add search UI that works with Algolia server

This guide is based on [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).

> This post guides you to do everything from scratch including backend(indexing) to frontend(search UI).

> However you can also check out [docsearch](https://community.algolia.com/docsearch/) program and let Algolia do the most of part for you. Check out the [documentation](https://community.algolia.com/docsearch/what-is-docsearch.html) if interested.

> FYI, [reactjs.org](https://github.com/reactjs/reactjs.org/blob/623523131e11a9c08ce01130e612f366d58b5ea1/src/components/LayoutHeader/DocSearch.js) is using docsearch.

## 1. Setup Account

Sign up at [Algolia](https://algolia.com/).

Click `Indices > Create Index`. Let's name our index `posts`. Type `posts`. We will not have multiple indexes here based on environments like `dev_posts` or `prod_posts`. So let's stick to posts without environment indicator.

Click `API Keys` and grab values of the following:

- Application ID
- Search-Only API Key
- Admin API Key

## 2. Indexing

```bash
yarn add dotenv gatsby-plugin-algolia
# or
npm install dotenv gatsby-plugin-algolia --save
```

Create a file `.env`:

```bash
GATSBY_ALGOLIA_APP_ID=xxx
GATSBY_ALGOLIA_ADMIN_API_KEY=yyy
GATSBY_ALGOLIA_SEARCH_API_KEY=zzz
GATSBY_ALGOLIA_INDEX_NAME=posts
```

`.env` is included in `.gitignore` which means it will never be committed to your git repository. Since it contains `GATSBY_ALGOLIA_ADMIN_API_KEY`, it shouldn't go public. If you use service like Netlify to deploy your project, you have to set up those environment variables there. For example, at Netlify, visit `Settings > Build & deploy > Build environment variables` and add those.

Open `gatsby-config.js` and add the following under `plugins`:

```javascript
module.exports = {
  plugins: [
    //...
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./gatsby-plugin-algolia-config.js`),
    },
    //...
  ],
}
```

Create a file `gatsby-plugin-algolia-config.js`:

```javascript
// gatsby-plugin-algolia-config.js

require('dotenv').config({
  path: `.env`,
})

const queries = [
  {
    query: `
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(
        ({
          node: {
            excerpt,
            frontmatter: { title },
            fields: { slug },
          },
        }) => ({
          title,
          description: excerpt,
          path: slug,
        })
      ),
  },
]

module.exports = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  queries,
}
```

`dotenv` will pick up [environment variables](https://www.gatsbyjs.org/docs/environment-variables/) from your `.env` file during a build process. The names of the environment variables start with `GATSBY_` because they're also used at runtime in a browser.

As you see the config above, we're using `excerpt` as `description` and `slug` as `path`.

Assuming you already have at least one blog post, let's upload your contents to Algolia server.

```bash
gatsby build
# or
npx gatsby build
```

> If you have `gatsby-plugin-offline` configured in your project, `gatsby build` will create service worker for you and it's not helping when you develop on localhost. Let's delete `public` folder, unregister service worker under your testing domain(i.g. localhost) at `Chrome DevTool > Application > Services Workers` and restart `gatsby develop`.

Now, let's go back to `Indices` menu at Algolia. You'll see records. Each record will contain `title`, `description` and `path`. We will use `title` and `description` as searchable attributes and show them at search result. When a user clicks an item from the search result, the user will be redirected to its `path`.

At `Indices > Ranking > Searchable Attributes`, add `title` and `description`.

At `Indices > Display > Display & Pagination > Attributes to highlight`, add `title` and `description`.

Okay, we're all set.

## 3. Search UI

It's time to attach a search UI to your frontend. Algolia provides [InstantSearch.js](https://github.com/algolia/instantsearch.js) and its React version, [React InstanceSearch.js](https://github.com/algolia/react-instantsearch/), but we're not going to use it. It is a full-featured search UI library with various built-in components. For now, we just want a simple UI. So we'll use [autocomplete.js](https://github.com/algolia/autocomplete.js).

First, open `Layout.js` and import `SearchBox`.

```javascript
<div>
  <SearchBox />
  {header}
</div>
```

Create a file `SearchBox.js`:

```javascript
// src/components/SearchBox.js

import React, { Component } from 'react'
import { navigate } from 'gatsby'
import './SearchBox.css'

let algoliasearch, autocomplete, client, index

if (typeof window !== 'undefined') {
  algoliasearch = require('algoliasearch/lite')
  autocomplete = require('autocomplete.js')
  client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
  )
  index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME)
}

class SearchBox extends Component {
  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
    autocomplete('#algolia-search-input', { hint: false }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'title',
        templates: {
          suggestion: function({ _highlightResult: { title, description } }) {
            return `
                <p class="title">${title.value}</p>
                <p class="description">${description.value}</p>
                `
          },
          footer:
            '<div class="branding">Powered by <img src="https://www.algolia.com/static_assets/images/press/downloads/algolia-logo-light.svg" /></div>',
        },
      },
    ]).on('autocomplete:selected', function(
      event,
      suggestion,
      dataset,
      context
    ) {
      navigate(suggestion.path)
    })
  }
  render() {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="search"
          id="algolia-search-input"
          placeholder="Search"
          style={{
            border: 'none',
          }}
        />
      </div>
    )
  }
}

export default SearchBox
```

Create a file `SearchBox.css`:

```css
// src/components/SearchBox.css

.algolia-autocomplete {
  width: 100%;
  color: #333;
}
.algolia-autocomplete .aa-input,
.algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-input {
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  margin-top: 0.25rem;
  -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 0.5rem 1rem;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion .title {
  font-size: 1rem;
  margin-bottom: 0rem;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion .description {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.25rem;
  margin-bottom: 0rem;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #c4d3e4;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}
.algolia-autocomplete .aa-dropdown-menu .branding {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
  margin: 0 0.5rem 0.25rem 0;
}
.algolia-autocomplete .aa-dropdown-menu .branding img {
  height: 1.25rem;
  position: relative;
  top: 0.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0;
}
```

Add new dependencies:

```bash
yarn add algoliasearch autocomplete.js
# or
npm install algoliasearch autocomplete.js --save
```

`algoliasearch` queries to Algolia server and `autocomplete.js` displays its result. They are a perfect couple.

The reason why we're checking the existence of `window` is that `window` is not provided during a build process(ref [\#1](https://github.com/gatsbyjs/gatsby/issues/309) [\#2](https://www.gatsbyjs.org/docs/debugging-html-builds/#how-to-check-if-window-is-defined)).

`templates.suggestion` returns a template for each result item.

On `autocomplete:selected`, you see `navigate` function being called. `navigate` is from `gatsby` and that's what `Link` from `gatsby` calls internally. So when you programmatically navigate to an internal path, `navigate` is a way to go.

You will want to change the style of `SearchBox`. To make it easier, replace second argument of `autocomplete` function from `{ hint: false }` to `{ hint: false, debug: true }` temporarily. The search result popup will not close on `blur`. You can check other options for `autocomplete.js` [here](https://github.com/algolia/autocomplete.js).

The actual code in this guide can be found [here](https://github.com/eunjae-lee/gatsby-starter-blog-with-algolia/commit/8a691298bcc3880dc6a87297b6cfbecc58d28e32).

I hope you enjoyed this and let me know what you think.

## Reference

- [DocSearch](https://community.algolia.com/docsearch/)
- [DocSearch Documentation](https://community.algolia.com/docsearch/what-is-docsearch.html)
- [Gatsby Environment Variables](https://www.gatsbyjs.org/docs/environment-variables/)
- [AutoComplete.js](https://github.com/algolia/autocomplete.js)

