---
title: "Abandoning a Side Project"
excerpt: "You can see my thought process from why I started it and to why I decided to stop it."
created_at: 2020-05-02T00:00:00.000Z
lang: en
---

We all start side projects easily and they get phased out. It can be either healthy or not, but anyway I think it's natural.

Recently I've been working (not intensively, though) on a side project which I named "Mardi". Mardi is a French word for "Tuesday". It's an alternative to [Alfred](https://www.alfredapp.com/) which is a launcher for apps, bookmarks, all sorts of custom functions.

I love tools. I love tweaking tools. I heard the paid feature of Alfred is powerful, but I was not convinced. I thought about what if I create an alternative but in JavaScript. And I let users add plugins. A plugin is a simple JavaScript package. It can be either a local folder or an NPM package. Later I could build a market place where people can search for plugins. The plugin exports a few functions according to the spec.

Considering how active JavaScript developer community is, I thought it was somehow promising. I created two plugins. One is obviously "app launcher" and another one is the color calculator.

[Eunjae Lee on Twitter](https://twitter.com/eunjae_lee/status/1235725236001259522)

So, here's the tech stack:

- Monorepo using yarn workspace
- I used Gatsby instead of create-react-app (`mardi-web`)
- The web app built by Gatsby runs on top of Electron (`mardi-electron`)
- There is a node server([koa](https://koajs.com/)) written in TypeScript for OS-level operations and to run all the plugins (`mardi-server`)
- `mardi-plugin-apps`
- `mardi-plugin-color`

Mostly it's written in TypeScript, and bundled by [TSDX](https://github.com/jaredpalmer/tsdx).

Then, why did I decide to quit? First of all, I started with curiosity from a technical point of view. I thought building an app in JS, and mainly targeting developers will attract lots of developer users. I still think it might work, but the biggest problem was I didn't have a concrete vision on this product itself. I didn't have many use-cases in my mind. The color calculator is a handy one for frontend developers, but I didn't have good enough ideas to boost myself for this project. I got something else more exciting than this.

And when I thought about the end goal of this project, it was too big. I couldn't even imagine the timeline. It was too ambitious. So apparently my passion was seeking something smaller and more realistic. That's kind of my thought process.

There is not much in the repository. It has some basic structure and client - server - plugin protocols working okay. Anyone can steal this idea or repository to make your stuff. Just let me know if you do because I'm curious.

[https://github.com/eunjae-lee/mardi](https://github.com/eunjae-lee/mardi)

