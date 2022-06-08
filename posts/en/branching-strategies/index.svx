---
title: "Branching Strategies for Release"
excerpt: "This post will give you some idea or headache about develop + master(main) branches."
created_at: 2019-12-17T00:00:00.000Z
lang: en
---

In git, it's important to choose an appropriate branching strategy for you.

There are many aspects there but this post is going to be a small piece of information around release process.

- If you use only `master` branch, what happens regarding release?
- If you use `develop` and `master` branches, what happens regarding release?

The following table compares the two cases. Choose what makes sense for your project.

## Unreleased Commit

### Same branch `master`

A PR merged is committed to `master` and user can see it.

### Release branch `develop + master`

A PR merged is committed to `develop` and user can see it, because it's the base branch.

## README.md

### Same branch `master`

User will see the content regarding unreleased things(But it's okay because we don't have much content on README.md).

### Release branch `develop + master`

Same

## Doc/Example Website

### Same branch `master`

User will see the examples regarding unreleased things(This is a problem, but the effect can be minimized if release is frequent enough).

### Release branch `develop + master`

User will see the examples deployed from `master`, so no problem here.

## Other

### Same branch `master`

When managing many versions, branches are straightforward(`legacy`, `master`, `next`).

### Release branch `develop + master`

- We have `master` as a snapshot of lastly released version.
- It can be confusing to manage many working branches and release branches, for example, `legacy`, `legacy_release`, `develop`, `master`, `next`, `next_release`.

