---
order: 100
title: A make replacement based on TypeScript
description: I'd love a TypeScript-based make replacement, without a dependency on node/ bun etc.
status: want
tags: ['tasks', 'task-runner', 'automation', 'make', 'typescript']
hasContent: true
---

So... what I'm after is something that can act like `make`, but have more script-friendly interactions.

A cross between a task runner and a scripting system.

I've looked at a few JS-based ones which looked good, but nothing really fits the bill...

I wanted something with minimal dependencies - just like `make`, install and run. The problem with the JS ones you need to make sure you're using node or bun or one of the others, and then you've got versioning issues with the runtime, or if you're using NVM to manage the version etc.

All too painful.

I _really_ like the idea of a TypeScript-based on though, simply because it's approachable enough to solve a few problem. Rich frameworks, function re-use etc.

...but, then I'm back to node/ bun.

I contemplated and played with a Go implementation that could parse and execute TypeScript. But that got very complex very quickly.

Now I'm wondering if something like [CS-Script](https://www.cs-script.net/) could fit the bill?

Either host the engine (ideally in AOT build for minimal self-contained executables) or just install the CS-Script app, and use C# as the Taskfile...

Some other alternatives to CS-Script include:

- [dotnet-script](https://github.com/dotnet-script/dotnet-script)
- [csrun](https://github.com/DamianEdwards/csrun/)
