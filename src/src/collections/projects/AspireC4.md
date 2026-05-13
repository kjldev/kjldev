---
order: 50
title: AspireC4
status: live
description: >
  An Aspire extension library that auto-generates live LikeC4 architecture diagrams
  from the Aspire resource graph. Diagrams update in real-time as resources start, stop,
  or produce errors — with each element linking back to the Aspire dashboard.
links:
  - url: https://github.com/kjldev/aspirec4
    name: GitHub
    image: ../../assets/github-mark.svg
  - url: https://www.nuget.org/packages/AspireC4.Hosting/
    name: NuGet
    image: ./shared-assets/nuget.svg
  - url: https://aspire.dev/
    name: Aspire
    image: ./shared-assets/aspire-logo.svg
  - url: https://likec4.dev/
    name: LikeC4
    image: ./shared-assets/likec4-logo.svg
tags:
  - aspire
  - dotnet
  - c4
  - likec4
  - architecture
  - visualisation
  - c4-model
  - diagrams-as-code
hasContent: true
---
AspireC4 is an extension library for the [Aspire][2] framework that generates live C4 architecture diagrams using LikeC4.

It provides real-time visualizations of your system's architecture, automatically updating as resources change state. Each element in the diagram links back to the Aspire dashboard for easy navigation and monitoring.

You can find the source code and installation instructions on the [GitHub repository](https://github.com/kjldev/aspirec4) and the package is available on [NuGet](https://www.nuget.org/packages/AspireC4.Hosting/).

For more information on LikeC4, visit the [LikeC4 website][1].

All of this was made possible by the excellent hardwork of the Aspire and LikeC4 teams, and the rest of the open-source community. AspireC4 is licensed under the MIT License, allowing you to freely use, modify, and distribute it in your projects.

## Examples

Here is a basic example of AspireC4 in action, showing a live architecture diagram generated from an Aspire resource graph using only the `builder.AddAspireC4()` extension method:

![Basic Example](aspirec4/makerstack-basic.png)

With a few additional configuration options, you can customize the diagram's appearance and behaviour:

 ```csharp
  // AppHost/Program.cs
  var builder = DistributedApplication.CreateBuilder(args);
  builder.AddAspireC4(opts => {
    opts.Title = "MakerStack Architecture";
  });

  // ...add other projects/resources such as databases, services, etc.
  builder
    .AddNodeApp("frontend", "../../frontend")
    .WithLikeC4Details(opts => {
      opts
        .WithLabel("MakerStack React SPA")
        .WithIcon("tech:react")
        ... etc
    });

  builder
    .AddProject<Projects.Web>("web")
    .WithLikeC4Details(opts => {
      opts
        .WithLabel("Web Host")
        .WithSummary(".NET 10/ ASP.NET Minimal API web app. Hosting APIs, and the Astro-based landing site and the MarkerStack SPA");
    })
    # Note the reference to the database project here, to save you from calling .WithReference(db) as well..
    .WithLikeC4Reference(db, opts => {
      opts
        .WithLabel("Tabular Data Stream (TDS)")
        ... etc
    });
  ```

![Enhanced integration](aspirec4/makerstack-enhanced.png)

[1]: https://likec4.dev/
[2]: https://aspire.dev/
