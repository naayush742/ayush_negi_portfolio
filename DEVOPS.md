# 🚀 DevOps Guide: Ayush Portfolio

This project has been fully **DevOpsified** with automated CI/CD pipelines, multi-stage Docker containerization, security scanning, dependency automation, and pre-commit code quality enforcement.

---

## 🏗 Architecture & DevOps Components

```
                     ┌─────────────────────────────────────────┐
                     │              Developer                  │
                     └────────────────────┬────────────────────┘
                                          │ git commit
                                          ▼
                             [Husky Pre-commit Hooks]
                             (ESLint, Prettier, tsc)
                                          │
                                          │ git push
                                          ▼
                             ┌────────────────────────┐
                             │     GitHub Repo        │
                             └────────────┬───────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                      ┌────────────────────────┐
     │  Continuous Integr.    │                      │  Continuous Deploy.    │
     │     (GitHub Actions)   │                      │    (Firebase Hosting)  │
     └────────────┬───────────┘                      └────────────┬───────────┘
                  │                                               │
      (Lint, Typecheck, Build,                        (Deploy to Live / PR
       Docker Image Test)                             Preview Channels)
```

---

## 🔑 1. Required GitHub Secrets Setup

To enable automated Firebase deployments and builds in GitHub Actions:

1. Navigate to your GitHub repository **Settings** -> **Secrets and variables** -> **Actions**.
2. Add the following **Repository secrets**:

| Secret Name | Description / Source |
| :--- | :--- |
| `FIREBASE_SERVICE_ACCOUNT_AYUSHNEGI_82CBC` | Firebase Service Account JSON key (generated via GCP / Firebase Console -> Project Settings -> Service Accounts -> Generate Private Key) |
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `ayushnegi-82cbc.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `ayushnegi-82cbc` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `ayushnegi-82cbc.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

---

## 🐳 2. Containerization (Docker & Docker Compose)

The project includes a production-ready, multi-stage `Dockerfile` leveraging Node 20 Alpine for building and Nginx Alpine for serving static assets with Gzip compression and security headers.

### Run locally via Docker Compose:
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:8080` (healthcheck endpoint at `http://localhost:8080/healthz`).

### Build and Run directly with Docker:
```bash
docker build -t ayush-portfolio:latest .
docker run -d -p 8080:80 ayush-portfolio:latest
```

---

## 🔄 3. CI/CD Workflows (`.github/workflows/`)

1. **`ci.yml` (Continuous Integration)**
   - Triggered on Pushes and Pull Requests to `main`, `master`, and `develop`.
   - Runs TypeScript strict type-checking (`npm run type-check`).
   - Runs ESLint validation (`npm run lint`).
   - Verifies production bundle build (`npm run build`).
   - Performs dry-run Docker image build verification.

2. **`deploy-firebase.yml` (Continuous Deployment)**
   - **Pull Requests**: Automatically builds and deploys to a dynamic **Firebase Hosting Preview Channel** and comments the preview URL on the PR.
   - **Pushes to `main`**: Automatically deploys the production build to the **Live Firebase Hosting** channel.

3. **`dependabot.yml` (Automated Security & Dependency Management)**
   - Scans `npm` packages weekly and creates automated Pull Requests for security patches and minor version bumps.
   - Scans `GitHub Actions` workflow versions weekly.

---

## 🛠 4. Code Quality & Pre-commit Hooks

- **Husky & Lint-staged**: Runs formatting (`prettier`) and linting (`eslint`) automatically on changed files prior to every `git commit`.
- **Pre-commit Typechecking**: Executes `tsc --noEmit` to ensure type safety before code is committed.

### Standard Commands Cheat Sheet:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local Vite development server |
| `npm run build` | Compile TypeScript and produce production bundle (`dist/`) |
| `npm run type-check` | Execute strict TypeScript type verification |
| `npm run lint` | Run ESLint check across TypeScript and JSX files |
| `npm run lint:fix` | Automatically fix ESLint warnings and errors |
| `npm run format` | Prettify source code across `src/` |
| `docker-compose up -d` | Launch application inside Nginx container |
