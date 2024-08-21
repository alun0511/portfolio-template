import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

if (!process.env.DATOCMS_API_TOKEN) {
  throw new Error(
    "Missing DATOCMS_API_TOKEN. Please add it to your .env.local file."
  );
}

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        Authorization: process.env.DATOCMS_API_TOKEN,
        "X-Exclude-Invalid": "true",
        "X-Environment": process.env.DATOCMS_ENVIRONMENT
          ? `${process.env.DATOCMS_ENVIRONMENT}`
          : "main",
      },
    },
  },
  documents: "./src/graphql/**/*.graphql",
  generates: {
    "src/types/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
