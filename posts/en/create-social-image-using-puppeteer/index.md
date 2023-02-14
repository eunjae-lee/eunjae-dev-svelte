---
title: "Create Social Image Using Puppeteer"
excerpt: "If you want to build a social image generated from scratch, this post will help you."
created_at: 2020-10-10T00:00:00.000Z
lang: en
---

You need something for `og:image`, but you don't want to look for a random image from unsplash that is barely related to your post. Let's automate it. So my plan is this.

1. I will make a page like [https://eunjae-stuff.vercel.app/blog-image.html?title=xxx&description=yyy](https://eunjae-stuff.vercel.app/blog-image.html?title=xxx&description=yyy)​ and let it render what the image will look like.
2. I will use [puppeteer](https://pptr.dev/) to render it and take a screenshot.

## Template

I've searched a bit, and it seems like 1200x628px seems to be a recommended resolution for Twitter card. To play with the template, I used [CodeSandbox](https://codesandbox.io/), and this is my sandbox:

[https://codesandbox.io/s/social-image-playground-so1ml?file=/index.html](https://codesandbox.io/s/social-image-playground-so1ml?file=/index.html)​

When building the sandbox,

- I didn't want to use any bundler.
- I just created an empty HTML file.
- I wanted to style it easily. I used [TailwindCSS](https://tailwindcss.com/).
- I just used their CDN version not to use a bundler. Its size is quite big, but it doesn't matter here.
- I used Google Fonts.

I uploaded this HTML file and a profile image file to Vercel. You can use Netlify, too.

To make this responsive to the query parameters, I've made a little change:

```html
<p id="title" class="text-orange-100 font-title leading-tight"></p>
<p id="description" class="text-orange-100 font-subtitle"></p>
...
<script type="text/javascript">
  const params = new URLSearchParams(window.location.search);
  ["title", "description"].forEach((key) => {
    document.getElementById(key).innerText = params.get(key);
  });
  setTimeout(() => {
    window.done = true;
  }, 200);
</script>
```

I'll explain about `window.done`, although I guess you've already noticed what it's for.

## Puppeteer

When you create an instance of puppeteer, you can do the following:

```javascript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
```

But if you're going to run this on the server-side, then it should change to:

```javascript
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  defaultViewport: null,
  args: chrome.args,
  executablePath: await chrome.executablePath,
  headless: chrome.headless,
})
```

So here's the full function:

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

Here are some remarks:

- We only need 1200x628, but considering the UI part of the browser like URL bar, tabs, etc. I just put large numbers to avoid scrolling.
- puppeteer sometimes took a screenshot even before the script set the title and description. That's why I put a setTimeout and set `window.done = true`. Here puppeteer waits for it and takes a screenshot.

It's up to you how to use it. I created a serverless function that generates an image and uploads it to my CMS service ([sanity.io](https://sanity.io/)). If you have a Gatsby blog with mdx, you can have a small script to run this function and put the generated image into your folder.

I'm not good at design, so I'd like to see how you all are doing with your templates. Show me yours. I'm interested. Leave a comment in the tweet ⬇️

[Eunjae Lee on Twitter](https://twitter.com/eunjae_lee/status/1315039354709045249)

