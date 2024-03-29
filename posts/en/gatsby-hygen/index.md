---
title: "Create Post on Gatsby with hygen"
excerpt: "You can automate your process just a little bit futher by having a blog post template and a script to use it."
created_at: 2019-01-01T00:00:00.000Z
lang: en
---

These days I've been trying and enjoying [Gatsby](https://www.gatsbyjs.org/). It provides many starters and this page is created by [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).
Using it, to create a new blog post, I need to create a file such as `./content/blog/hello-world/index.md` and its content would be

```
---
title: Hello World
date: '2015-05-01T22:12:03.284Z'
---
This is my first post on my new fake blog! How exciting!
```

This sounds simple enough, but I wanted to make it simpler with [hygen](http://www.hygen.io/).

Here are the steps.

```bash
npx hygen init self
npx hygen generator new --name blog
```

`_templates/blog/new/hello.ejs.t`will be added. The name doesn't matter, so let's change:

```bash
mv _templates/blog/new/hello.ejs.t _templates/blog/new/index.ejs.t
```

Edit `index.ejs.t` like the following:

```markdown
---
to: content/blog/test-post/index.md
---
This is a test post.
```

Let's try run:

```bash
npx hygen blog new
```

It will generate a file at `content/blog/test-post/index.md` and its content will be `This is a test post.`. Now you'll see how it works.

Let's add a prompt so that it will ask you the title of a new post and you will also slugify it for url.

Add `_templates/blog/new/index.js`like the following:

```javascript
const slugify = require('slugify')  
module.exports = {  
  prompt: ({ prompter }) => {  
    return new Promise((resolve, reject) => {  
      prompter  
        .prompt({  
          type: 'input',  
          name: 'title',  
          message: 'What is the title?',  
        })  
        .then(({ title }) => {  
          resolve({  
            title,  
            date: new Date().toISOString(),  
            slug: slugify(title, { remove: /[*+~.()'"!:@]/g, lower: true }),  
          })  
        })  
    })  
  },  
}
```

Edit `_templates/blog/new/index.ejs.t`like the following:

```markdown
---
to: content/blog/<%= slug %>/index.md
---
---
title: '<%= title %>'  
date: '<%= date %>'
---
```

Okay, let's add `slugify` to your devDependencies:

```bash
yarn add slugify -D
```

And run it:

```bash
npx hygen blog new
```

It will ask you the title:

```bash
? What is the title? › The First Blog Post
```

It will generate `content/blog/the-first-blog-post/index.md` and its content will be:

```markdown
---
title: 'The First Blog Post'  
date: '2019-01-01T08:50:08.194Z'
---
```

Okay, let's put a script into `package.json`.

```javascript
"scripts": {
  "g": "hygen blog new",
}
```

And add `hygen` to devDependencies:

```bash
yarn add hygen -D
```

Okay, you're good to go.

```bash
yarn g
```

## Read More

[https://www.brianhan.co/generate-blog-posts-gatsby-hygen](https://www.brianhan.co/generate-blog-posts-gatsby-hygen)

