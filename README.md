<div align="center">
  <h1>EyesUp</h1>
</div>

A minimal app that helps you follow the 20-20-20 rule and rest your eyes while working

## 📋 To-do

- Support for multiple languages (starting with pt-BR and en-US)
- Preference settings (customize durations)
- Sync between devices
- Design improvements (e.g., different background during rest)
- Explanation of the 20-20-20 rule
- Completed cycles counter
- Full history (with charts?)
- Sounds (e.g., ticking, finished cycle)
- Alert/notification when a cycle finishes

## ⚙️ Setup

Install the dependencies with:

```bash
pnpm install
```

## 🚀 Execution

Execute the project in development mode with:

```bash
pnpm dev
```

## 🔣 Typecheck

Type-check the whole project with:

```bash
pnpm typecheck
```

## ✍ Linter

Lint the code with:

```bash
pnpm lint:js [file ...]          # verifies JS of the specified files (or all if file is omitted)
pnpm lint:js:fix [file ...]      # verifies and fixes JS of the specified files (or all if file is omitted)

pnpm lint:style [file ...]       # verifies CSS of the specified files
pnpm lint:style:fix [file ...]   # verifies and fixes CSS of the specified files
pnpm lint:style:all              # verifies CSS of all files
pnpm lint:style:fix:all          # verifies and fixes CSS of all files
```
