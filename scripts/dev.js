const concurrently = require("concurrently");
const fs = require("fs-extra");
const path = require("path");

const PACKAGES_DIR = path.join(process.cwd(), "packages");
const ORG_PREFIX = "@dotz/";

async function main() {
  const allPackages = await fs.readdir(PACKAGES_DIR);
  const packageswithDevCommand = allPackages
    .map((p) => fs.readJSONSync(path.join(PACKAGES_DIR, p, "package.json")))
    .filter((pkgJson) => !!pkgJson.scripts.dev);

  const commands = packageswithDevCommand.map((pkgJson) => ({
    command: `yarn workspace ${pkgJson.name} dev`,
    name: pkgJson.name.replace(ORG_PREFIX, ""),
  }));

  concurrently(commands, {
    killOthers: ["failure", "success"],
    cwd: process.cwd(),
  });
}

main();
