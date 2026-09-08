import { existsSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const excluded = ["app/api", "app/sign-in", "app/sign-up", "app/dashboard", "app/advanced-reports", "app/connected-accounts"];
const moved = excluded.map((path) => ({ source: resolve(root, path), target: resolve(root, `.static-build-${path.replaceAll("/", "-")}`) }));
const proxy = resolve(root, "proxy.js");
const disabledProxy = resolve(root, "proxy.disabled.js");

try {
  for (const item of moved) if (existsSync(item.source)) renameSync(item.source, item.target);
  if (existsSync(proxy)) renameSync(proxy, disabledProxy);
  const result = spawnSync(process.platform === "win32" ? "npm.cmd run build" : "npm run build", [], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  if (result.error) console.error(result.error);
  process.exitCode = result.status ?? 1;
} finally {
  for (const item of [...moved].reverse()) if (existsSync(item.target)) renameSync(item.target, item.source);
  if (existsSync(disabledProxy)) renameSync(disabledProxy, proxy);
}
