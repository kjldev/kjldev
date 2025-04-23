---
order: 2
title: Purview Event Store
description: A .NET and Postgres-based Event Store...
status: thinking
tags: ['event-store', 'event-sourcing']
hasContent: true
---

Planning an Event Store based around a Postgres db, allowing for LINQ querying (using types).

I've already got one that supports Azure Storage (table and blobs), CosmosDB, and MongoDb, but I think a Postgres one using the JSONB column types, with GIN would be a great alternative.
