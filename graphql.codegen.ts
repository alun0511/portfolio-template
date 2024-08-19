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
    "src/graphql/generated.ts": {
      plugins: [
        {
          add: {
            content:
              "import { Record as StructuredTextRecord, StructuredText } from 'datocms-structured-text-utils';",
          },
        },
        "typescript",
        {
          "typescript-operations": {
            strictScalars: true,
            scalars: {
              BooleanType: "boolean",
              CustomData: "Record<string, unknown>",
              Date: "string",
              DateTime: "string",
              FloatType: "number",
              IntType: "number",
              ItemId: "string",
              JsonField:
                "StructuredText<StructuredTextRecord, StructuredTextRecord>",
              MetaTagAttributes: "Record<string, string>",
              UploadId: "string",
            },
          },
        },
        "typed-document-node",
      ],
    },
  },
};

export default config;
