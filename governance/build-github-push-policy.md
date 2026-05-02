# Build-to-GitHub Push Policy

After any project change that reaches a successful production build, Van must complete the GitHub update loop if the project is connected to GitHub.

Required workflow:

1. Check repo connection:
   `git remote -v`

2. Check working tree:
   `git status --short`

3. Run verification:
   `npm run lint`
   `npm run build`

4. If lint/build pass and relevant files changed:
   `git add <relevant files only>`
   `git commit -m "<clear project-specific commit message>"`
   `git push origin main`

5. If no files changed:
   Report: `No push needed — working tree clean.`

6. If repo has no remote:
   Report: `No GitHub remote connected — push skipped.`

7. If build fails:
   Do not commit or push. Fix build first.

8. Never commit:
   - `.next`
   - `node_modules`
   - cache files
   - temporary extraction folders
   - unrelated local noise
   - secrets
   - `.env` files

9. Final report must always include:
   - lint result
   - build result
   - commit hash if committed
   - push status
   - files changed

Policy rule:
Successful build + connected GitHub + relevant changes = commit and push unless explicitly blocked.
