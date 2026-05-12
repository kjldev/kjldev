---
order: 1000
title: A replacement to GNU Make with scripting
description: I'd love a make replacement based on a scripting language, but without loads of dependencies (like  node/ bun etc).
status: retired
tags: ['tasks', 'task-runner', 'automation', 'make']
hasContent: true
---

> [!NOTE]
> I ended up finding the excellent [Just 🤘](https://just-systems.com) - a rust-based task runner with a simple syntax and no dependencies.
> It's fantastic, and I highly recommend it if you're looking for a make replacement. It's cross-platform, easy to use, and has a great community around it.

---

I <span class='text-xl'>❤️</span> being able to simply run `make` from a terminal:

```shell
make build

# or

make test

# ... even
make vs
# 👆 This is particularly lazy as it just
# loads Visual Studio with the correct solution for me...
# I actually got an alias of 'm' too.
```

I've even got a common Makefile I bring into all my projects to give me some sensible helpers like auto-displaying the available targets etc... you can find that [shared Makefile gist](https://gist.github.com/kieronlanning/0bd4dedab604ea401a40452f39033c59).

---

But... what I'm after is something that can act like `make` does, but has more script-friendliness.

A cross between a task runner and a scripting system.

I've looked at a few JS-based ones which looked good, but nothing really fits the bill...

I wanted something with minimal dependencies - just like `make`, _install it and run_.

The problem with any of the JS ones is that you'll need to make sure you're using `node` or `bun` (or even `deno`), and then you've got to make sure its the right version, with the right dependencies.

> [!IMPORTANT]
>
> _It's all too painful..._

I _really_ liked the idea of a TypeScript-based one. TS is simple, its approachable, its got rich frameworks and massive re-use through functions in the _'Taskfile'_ etc.

...but, then I'm back to `node` and `bun`.

I contemplated, and even played with, a Go implementation that could parse and execute TypeScript within the app. But as you can imagine that got very complex very quickly.

Now I'm wondering if something like [CS-Script](https://www.cs-script.net/) could fit the bill?

Either host the engine (ideally in AOT build for minimal self-contained executables) or just install the CS-Script app, and use C# as the `Taskfile`...

Some other alternatives to CS-Script include:

- [dotnet-script](https://github.com/dotnet-script/dotnet-script/)
- [csrun](https://github.com/DamianEdwards/csrun/)

> BTW, I have seen [Taskfile](https://taskfile.dev/) but I think there's already too much YAML in the world... and it isn't a nice scripting experience.

---

## 2026-05-12 ... found Just

I've been using [Just 🤘](https://just-systems.com) - a rust-based task runner with a simple syntax and no dependencies - for a few months. And it's perfect. It does everything I need.

Granted, the scripting support is based on your shell - which can pose a problem for cross-platform projects, but I'm happy with the current state of plate.

## 2025-03-05 ... found Hereby

I've just found [Hereby](https://hereby.js.org/) which looks like a good candidate. It has a few dependencies, but it looks like it could be a good fit... I generally use bun for everything, so that's usually installed anyway.

And it's no drama to install bun in a pipeline, so that satisfies my want for a TypeScript-based task runner...

Looks active on [GitHub](https://github.com/jakebailey/hereby)
and has a good amount of stars and recent commits.
