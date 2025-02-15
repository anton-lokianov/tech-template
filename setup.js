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
  // Reinitialize git repository first
  reinitializeGit();

  installDependencies();

  const installFramer = await question(
    "Do you want to install framer-motion? [y/N] "
  );
  if (installFramer.toLowerCase() === "y") {
    installPackage("framer-motion", "npm install framer-motion");
  }

  const installZustand = await question(
    "Do you want to install zustand? [y/N] "
  );
  if (installZustand.toLowerCase() === "y") {
    installPackage("zustand", "npm install zustand");
  }

  const installShadcn = await question(
    "Do you want to install shadcn UI? [y/N] "
  );
  if (installShadcn.toLowerCase() === "y") {
    installPackage("shadcn UI", "npx shadcn-ui@latest init");
  }

  console.log("Setup complete!");
  closeReadline();
}

setup();
