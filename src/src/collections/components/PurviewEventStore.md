---
order: 2
title: Postgres-based Event Store
description: A Postgres-based .NET Event Store...very early days, but built on a solid foundation.
status: thinking
tags: ['event-store', 'event-sourcing']
hasContent: true
---

I'm loosely thinking about an Event Store based around Postgres, allowing for rich LINQ-based querying based on aggregate types.

I've got a pluggable one that I've been using for years now, it already supports:

- Azure Storage
  - Azure Table Storage for version, idempotency-tracking, and events,
  - Azure Blobs for snapshots and events greater than 32kb.
- CosmosDB for snapshots
  - This is a companion to storing events in Azure Table Storage.
- MongoDb for events and/ or snapshots
  - For snapshots, it can be used as a companion to storing events in Azure Table Storage.

...but I've been thinking a Postgres-based one using the JSONB column type, with GIN-based indexing...

<span class='text-6xl'>
  🤔
</span>

I've been noodling one the variations above for years (and years, and years). I've had it running in production with multiple terabytes of data without issue during all this time - more thanks to Azure's massive scale.

But having a consistent append-only, transactional mechanism for event storage _and_ rich querying for snapshots has always been a challenge.

...time for a re-think?
