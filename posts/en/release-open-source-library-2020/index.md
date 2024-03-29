---
title: "How to Release Open Source Library"
excerpt: "This post suggests an alternative release process for JavaScript libraries."
created_at: 2020-01-04T00:00:00.000Z
lang: en
---

In this article, I'm going to talk about how to release open source library as I build up a little script to ease the process. After that, I will show you the pain points in that process. I will show you a new process that solves the problems. And finally, I will introduce a tool for it.

## Table of Contents

1. Previous release process
2. Problems
3. New release process
4. What's different?
5. Introducing Ship.js

Disclaimer

I am the author of [Ship.js](https://github.com/algolia/shipjs). At the end of this article, I will talk a bit about it. It's okay if you don't/can't use Ship.js. This article will still tell you the new process and how it will ease your releases.

## 1. Previous release process

### In a nutshell,

You go through steps like the following:

- Updating `version` in `package.json`
- Update [CHANGELOG.md](http://CHANGELOG.md)
- `npm run build`
- `npm publish`
- `git tag vx.y.z`

### Branching Strategy

There are two major branching strategies in terms of release.

- `master + release`
   - You commit to master or merge PRs to master.
   - master is a stable branch whenever you can release from.
   - release is a snapshot of the latest release.
   - You might use `develop + master` or whatever.
1. `master` **only**: Almost the same with the above except that you don't maintain any snapshot branch for the latest release.

Each strategy has pros and cons and you should choose what fits your needs. You can read a dedicated article [Branching Strategies](https://eunjae.dev/branching-strategies) to learn more.

In this article, to make things simple, I'll choose the latter, `master` only.

### A Release Script for You

Let's write a script. I assume you already added `shelljs` as a devDependency.

👇🏼 Prepare some helper functions.

```javascript
#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');
const exec = command =>
  shell
    .exec(command)
    .toString()
    .trim();
const error = message => {
  console.error(message);
  process.exit(1);
};
```

👇🏼 We need to run it only on `master` branch.

```javascript
const currentBranch = exec('git rev-parse --abbrev-ref HEAD');
if (currentBranch !== 'master') {
  error('This script runs only on `master` branch.');
}
```

👇🏼 Release in a clean working tree.

```javascript
const isWorkingTreeClean = exec('git status --porcelain') === '';
if (!isWorkingTreeClean) {
  error('Working tree is not clean.');
}
```

👇🏼 Sync with the remote.

```javascript
exec('git pull origin master');
exec('git fetch --tags');
exec('git push origin master');
```

👇🏼 You don't want to release something that doesn't pass your tests.

```javascript
exec('npm install');
exec('npm run test');
```

👇🏼 Bump the version in `package.json`. This assumes your commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

```javascript
exec('npx standard-version --skip.changelog --skip.commit --skip.tag');
// by default, `standard-version` does the four steps: bump, changelog, commit, tag
// https://github.com/conventional-changelog/standard-version
```

👇🏼 Update the [CHANGELOG.md](http://CHANGELOG.md).

```javascript
exec('npx conventional-changelog -p angular --infile CHANGELOG.md --same-file');
```

👇🏼 This will make a commit of the changes.

```javascript
const nextVersion = JSON.parse(fs.readFileSync('package.json')).version;
exec('git add .');
exec(`git commit -m "chore: release v${nextVersion}"`);
```

👇🏼 The most important part.

```javascript
exec('npm run build && npm publish');
```

👇🏼 That's it.

```javascript
exec(`git tag v${nextVersion}`);
exec('git push origin master');
exec(`git push origin v${nextVersion}`);
```

How is it? It's straightforward. It works well.

## 2. Problems

As you use the script above several times, you will face problems like the following:

### You make mistakes.

- The new version which is semantically bumped can be wrong if you wrote a wrong commit message before. However, you don't get a chance to fix it.
- `conventional-changelog` updates the changelog for you. However, you didn't get a chance to refine it.
- You used the wrong version of one of your tools, leading to a different build result.

### You are blocked.

- You have e2e tests which take 30 minutes, so you had to wait for the script to finish.
- Or you completely forgot what you were doing and got back to it 3 hours later.
- Or even worse, you couldn't do any more work on that repository until the release process got finished.

### You do it alone.

- You are not sure if you are doing a good job with that release because you run the script on your computer and you are the only one who keeps an eye on it.

### You manage more than one project.

- You may have the release script copy&pasted into all of your projects. Whenever you make a small change in one, you have to apply the change all over the other repositories.
- Your projects have slightly different needs. As time passes, the release scripts diverge. And they are now on their own.
- Every time you release something, you need to read the release script first to see if there is anything special you need to take care of.

## 3. New release process

Let's solve the problems. We need a better process. It consists of three steps:

### Step 1. Prepare a Pull Request

- Figure out the next version (`x.y.z`).
- Check out a staging branch, like `releases/vx.y.z`.
- *Now in the staging branch,*
   - Bump the version.
   - Update the changelog.
   - Commit the changes.
   - Create a pull request from `releases/vx.y.z` to `master`.

### Step 2. Review the Pull Request

- Go to GitHub and review the pull request.
- You can do it alone or ask your colleagues.
- If there's something wrong, you can add more commits to the PR.
- When everything looks fine, you merge the PR.

### Step 3. Trigger the release.

Let's assume you already have configured your CI service for the following:

- When you merged the PR, the merge commit `chore: release vx.y.z` has been added to `master`.
- Your CI service gets notified of it.
- It checks if the latest commit message starts with `chore: releases v`.
- If not, it quits.
- If so, it starts the following:
   - `npm run test`
   - `npm run build`
   - `npm publish`
   - Create git tag.
   - Push the tag to the remote.

Tokens

For CI service to release to NPM and push tags to GitHub, you need to configure NPM token and GitHub token as environment variables in your CI service.

## 4. What is different?

We had these problems:

- You make mistakes.
- You are blocked.
- You do it alone.
- You manage more than one project.

Now, what happened?

### You make fewer mistakes.

Previously, the whole script ran on your computer and you were in charge of making sure it did right. Now, you run only the first part on your computer which means chances are you will make fewer mistakes.

### You are less blocked.

Previously, you had to wait for the whole process to finish. Now, you run only the first part on your computer which is fairly short. The other big parts(reviewing + testing & release) will be done asynchronously.

It means:

- Part 1: On your computer, you run a script for less than a minute.
- Part 2: Someone else can review the PR
- Part 3 : CI service will do the rest.

You are almost not blocked at all.

### You no longer do it alone.

Again, now you're not doing it alone anymore. The PR can be reviewed by others. Since it's asynchronous, the review can happen slowly. There is no pressure. Everyone can take their time to review the changes in the PR. They can run some manual tests based on the PR to make sure if everything is okay. Now the burden is shared.

### You manage more than one project.

This isn't solved yet. Instead of having a script in each repository, it will be better to have it as an external tool that adapts to many different projects with configuration.

## 5. Introducing Ship.js

After I came up with this new process, I started to build [Ship.js](https://github.com/algolia/ship.js). It helps setup this process for you.

On your project, run the following:

```Bash
npx shipjs setup
```

It will ask you some questions, add Ship.js as a devDependencies and create a config file dedicated for your project.

Once it's done, what you need to do is run the following:

```Bash
npm run release:prepare
# or
yarn run release:prepare
```

It will run the Part 1 and open a PR on your browser. Now you can share the PR with your colleagues and review it on GitHub. When you think it's good to go, you merge the PR.

Now it's time to run Part 3. Pull the changes and you can run the following command manually:

```Bash
npm run release:trigger
# or
yarn run release:trigger
```

However, you probably want your CI service to run it for you. If you use CircleCI or GitHub Actions, `npx shipjs setup` already must have done the CI configuration. Plus, if you setup slack webhook url, it even notifies you about the release.

An interesting part is, you can even schedule your release. What I do for Ship.js is, I configured CircleCI to run `yarn run release:prepare` every Tuesday 10AM. So at every Tuesday 10AM, new PR is created and I get notified. I review the PR. If it's not enough for next release, I just close it. If it's good enough, I merge it. Then the CircleCI will do the rest. This literally can be done on my mobile phone. Since the first public release v0.0.3 at July 18 2019, during the 6 months, I have released another 37 versions of Ship.js. It's like more than one release per week. And releasing never bothered me.

What do you think? I hope you like the idea. Even if you don't use Ship.js or cannot use it, you can still adopt the idea. You can create a PR for release, review, and release on CI. This new process will solve many problems. We do have other real problems to solve. Let's release often without sweating.

