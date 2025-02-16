import fs from "fs";
import { question, closeReadline } from "./cli/questions.js";
import {
  installDependencies,
  installPackage,
  reinitializeGit,
} from "./cli/installers.js";

if (!fs.existsSync("package.json")) {
  console.error(
    "Error: package.json not found! Please run this script from your project's root directory."
  );
  process.exit(1);
}

async function setup() {
  reinitializeGit();

  installDependencies();

  const installFramer = await question(
    "Do you want to install framer-motion? [Y/N] "
  );
  if (installFramer.toLowerCase() === "y") {
    installPackage("framer-motion", "npm install motion");
  }

  const installZustand = await question(
    "Do you want to install zustand? [Y/N] "
  );
  if (installZustand.toLowerCase() === "y") {
    installPackage("zustand", "npm install zustand");
  }

  const installShadcn = await question(
    "Do you want to install shadcn UI? [Y/N] "
  );
  if (installShadcn.toLowerCase() === "y") {
    installPackage("shadcn UI", "npx shadcn@latest init");
  }

  console.log("Setup complete!");
  closeReadline();
}

setup();
