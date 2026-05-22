# TypeScriptBun

Library management API (Bun + Elysia + SQLite).

## Structure

```
src/
  main.ts              # entry point
  app.ts               # Elysia instance
  register-routes.ts   # side-effect route registration
  controllers/
  services/
  db/
  types/
tests/
  unit/
  integration/
```

## Commands

```bash
bun run start   # start server on :3000
bun test        # run tests
```
