---
order: 100
title: GFM for Azure DevOps Wikis
description: |
  An Azure DevOps extension to render wiki content using GitHub
  Flavoured Markdown (GFM)...because the Azure DevOps wiki renderer drives me crazy 🤬 
status: in-progress
tags: ['azure-devops', 'markdown', 'gfm', 'wiki', 'mermaid']
hasContent: true
---

I've been noodling on this for a few days, and despite how
baffling and disjointed the Azure DevOps extensions documentation is, I think I've got a good start on a workable solution...

> [!CAUTION]
> Being forced to use React 16 in 2025 while using _any_ packages is painful! 🩻

All of this is because I wanted some basics..

Like being able use [Mermaid](https://mermaid-js.github.io/mermaid/#/) in Azure DevOps wikis that actually rendera correctly! 😁 (don't ask)

Or the awesome [alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)!

... like this:

> [!NOTE]
> This is a note.

> [!TIP]
> This is a tip.

> [!IMPORTANT]
> This is important.

> [!WARNING]
> This is a warning.

> [!CAUTION]
> This is a caution.

---

## 2025-04-29 ... current situation

I've imported some of the [Purview Telemetry Source Generator](https://github.com/kjldev/purview-telemetry-sourcegenerator) wiki to help with testing...

Here's the current state of the extension:

![Azure DevOps Wiki, with GFM](./gfm-azure-devops/azure-devops-wiki-gfm.png)

... and here is the original/ GitHub version of the same page:

![GitHub Wiki, with GFM](./gfm-azure-devops/github-wiki.png)

---

As you can see... it's not quite there yet, but solid progress so far!
