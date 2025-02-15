import { execSync } from "child_process";
import fs from "fs";

export const installDependencies = () => {
  console.log("Installing project dependencies...");
  try {
    execSync("npm install", { stdio: "inherit" });
  } catch {
    console.error("Failed to install dependencies.");
    process.exit(1);
  }
};

export const installPackage = (packageName, command) => {
  console.log(`Installing ${packageName}...`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch {
    console.error(`Failed to install ${packageName}.`);
    process.exit(1);
  }
};

export const reinitializeGit = () => {
  console.log("Reinitializing Git repository...");
  try {
    // Remove existing .git directory
    fs.rmSync(".git", { recursive: true, force: true });

    // Initialize new git repository
    execSync("git init", { stdio: "inherit" });

    // Create initial commit
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "Initial commit"', { stdio: "inherit" });

    console.log("✅ Git repository has been reinitialized");
  } catch (error) {
    console.error("Failed to reinitialize Git repository:", error);
    process.exit(1);
  }
};
