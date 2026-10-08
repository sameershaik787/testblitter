# 💱 Currency & Finance Calculator (Sample Project)

A sample HTML, CSS, and JavaScript web project configured with an automated **GitHub Actions CI/CD workflow (`.github/workflows/ci.yml`)** to build and test code on every push and pull request.

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions workflow configuration (YAML)
├── index.html              # Main web page layout (HTML5)
├── style.css               # Modern responsive styling (CSS3)
├── app.js                  # Frontend logic & modular calculation functions
├── app.test.js             # Automated unit tests (Node.js test runner)
├── package.json            # Project metadata & npm scripts
├── .gitignore              # Files to ignore in Git
└── README.md               # Documentation & setup guide
```

---

## 🚀 How to Create a GitHub Repository and Upload this Project

### Step 1: Create a New Repository on GitHub
1. Open [GitHub.com](https://github.com/) in your browser and sign in.
2. In the upper-right corner, click the **`+`** icon and select **New repository**.
3. Fill in the repository details:
   - **Repository name:** e.g., `currency-calculator` or `sample-html-css-js`
   - **Description:** e.g., `Sample HTML, CSS, JS project with automated GitHub Actions CI`
   - **Visibility:** Public (or Private)
   - Do **not** initialize with a README / .gitignore / License (as we already have them locally).
4. Click **Create repository**.
5. Copy your repository's HTTPS or SSH URL (e.g. `https://github.com/<your-username>/<repo-name>.git`).

---

### Step 2: Initialize Git and Push Local Code

Open your terminal (PowerShell, Command Prompt, or Bash) in the project directory:

```bash
# 1. Navigate to the project directory
cd "sample-web-app"

# 2. Initialize a local Git repository
git init

# 3. Add all project files
git add .

# 4. Commit the files
git commit -m "feat: initial commit with HTML/CSS/JS and GitHub Actions CI workflow"

# 5. Rename default branch to main
git branch -M main

# 6. Link your local repo to your GitHub remote repository
git remote add origin https://github.com/<your-username>/<repo-name>.git

# 7. Push the code to GitHub
git push -u origin main
```

---

## ⚙️ GitHub Actions Workflow (`ci.yml`)

The file [`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml) triggers on every `push` and `pull_request` to `main` or `master`.

### Workflow Stages:
1. **Trigger:** Listens for `push` and `pull_request` events.
2. **Matrix Build:** Runs across multiple Node.js LTS versions (`18.x`, `20.x`, `22.x`).
3. **Checkout:** Clones the latest code using `actions/checkout@v4`.
4. **Environment:** Sets up Node.js via `actions/setup-node@v4`.
5. **Linting:** Runs `npm run lint`.
6. **Testing:** Executes `npm test` running 10 unit test assertions.
7. **Build Verification:** Executes `npm run build` to ensure assets are production-ready.

---

## 🧪 Local Testing

You can run the tests locally at any time:

```bash
# Run unit tests
npm test

# Run build check
npm run build
```

---

## 📊 Monitoring CI on GitHub
1. After pushing your code, go to your GitHub repository in your browser.
2. Click on the **Actions** tab at the top.
3. You will see the **Build & Test CI** workflow running automatically for your commit.
4. Click on the workflow run to view real-time logs and test pass reports.
