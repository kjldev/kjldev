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

---

## 2025-04-29 ... current situation

I've imported some of the [Purview Telemetry Source Generator](https://github.com/kjldev/purview-telemetry-sourcegenerator) wiki to help with testing...

Here's the current state of the extension:

![Azure DevOps Wiki, with GFM](./gfm-azure-devops/azure-devops-wiki-gfm.png)

... and here is the original/ GitHub version of the same page:

![GitHub Wiki, with GFM](./gfm-azure-devops/github-wiki.png)

---

As you can see... it's not quite there yet, but solid process so far!
