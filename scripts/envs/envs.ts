#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface EnvConfig {
  constants: Record<string, string>;
  environments: Record<string, Record<string, string>>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

/**
 * Reads the `env.json` file and generates .env files for different environments.
 */
program
  .command("pull")
  .description("Generate .env files based on your env.json.")
  .action(() => {
    const envFilePath = path.join(__dirname, "../../env.json");

    let envConfig: EnvConfig;

    // Read and parse the root env.json file
    try {
      const fileContent = fs.readFileSync(envFilePath, "utf8");
      envConfig = JSON.parse(fileContent) as EnvConfig;
    } catch (error) {
      console.error("Error reading env.json file:", (error as Error).message);
      process.exit(1);
    }

    const { constants, environments } = envConfig;

    if (!constants || !environments) {
      console.error(
        "Invalid env.json format. Please ensure constants and environments are defined."
      );
      process.exit(1);
    }

    // typically: [development, production, test]
    Object.keys(environments).forEach((env) => {
      const envFileName = `.env.${env}`;
      const envFilePath = path.join(__dirname, "../../", envFileName);

      // merge constants and environment-specific variables, env-specific take priority
      const envVars = {
        ...constants,
        ...environments[env],
      };

      // convert environment variables object to key=value format
      const envContent = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

      // write the .env file for the specific environment
      try {
        fs.writeFileSync(envFilePath, envContent, "utf8");
        console.log(`Successfully created ${envFileName}`);
      } catch (error) {
        console.error(
          `Error writing ${envFileName}:`,
          (error as Error).message
        );
      }
    });
  });

program.parse(process.argv);
