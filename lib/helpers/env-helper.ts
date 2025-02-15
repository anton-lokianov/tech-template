import { z } from "zod";

type EnvConfig<
  TServer extends Record<string, z.ZodType>,
  TClient extends Record<string, z.ZodType>,
> = {
  server: TServer;
  client: TClient;
  runtimeEnv: Record<string, string | undefined>;
  skipValidation?: boolean;
  emptyStringAsUndefined?: boolean;
};

type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

type EnvValidationResult<
  TServer extends Record<string, z.ZodType>,
  TClient extends Record<string, z.ZodType>,
> = Simplify<
  {
    [K in keyof TServer]: z.infer<TServer[K]>;
  } & {
    [K in keyof TClient]: z.infer<TClient[K]>;
  }
>;

type ZodErrorFormat = {
  _errors: string[];
  [key: string]: ZodErrorFormat | string[];
};

function createEnv<
  TServer extends Record<string, z.ZodType>,
  TClient extends Record<string, z.ZodType>,
>(config: EnvConfig<TServer, TClient>): EnvValidationResult<TServer, TClient> {
  const _serverSchema = z.object({ ...config.server });
  const _clientSchema = z.object({ ...config.client });
  const _runtimeEnv = config.runtimeEnv;

  /**
   * Validate client-side environment variables naming convention
   * Ensures all client-side variables start with NEXT_PUBLIC_ prefix
   * @throws Error if any client environment variable doesn't start with NEXT_PUBLIC_
   */
  for (const key in config.client) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      throw new Error(
        `❌ Invalid public environment variable name: ${key}. It must start with 'NEXT_PUBLIC_'`
      );
    }
  }

  /**
   * Process empty strings in environment variables
   * When emptyStringAsUndefined is true, converts empty strings to undefined
   * @param _runtimeEnv - The runtime environment variables object
   * @returns Record<string, string | undefined> - Processed environment variables
   */
  const processedEnv = config.emptyStringAsUndefined
    ? Object.fromEntries(
        Object.entries(_runtimeEnv).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ])
      )
    : _runtimeEnv;

  /**
   * Skip validation step if skipValidation is true
   * Useful for development/testing scenarios where validation isn't needed
   * @returns The unvalidated environment variables cast to the expected type
   */
  if (config.skipValidation) {
    return processedEnv as EnvValidationResult<TServer, TClient>;
  }

  /**
   * Initialize storage for separated environment variables
   * Used to split variables into server-side and client-side groups
   */
  const serverVars: Record<string, unknown> = {};
  const clientVars: Record<string, unknown> = {};

  /**
   * Split environment variables into server and client categories
   * Variables with NEXT_PUBLIC_ prefix go to clientVars, others to serverVars
   * @param processedEnv - The processed environment variables
   */
  Object.entries(processedEnv).forEach(([key, value]) => {
    if (key.startsWith("NEXT_PUBLIC_")) {
      clientVars[key] = value;
    } else {
      serverVars[key] = value;
    }
  });

  /**
   * Validate server-side environment variables against schema
   * Performs Zod schema validation and provides detailed error messages
   * @throws Error if validation fails, with console output showing specific issues
   */
  const parsedServer = _serverSchema.safeParse(serverVars);
  if (!parsedServer.success) {
    console.error("❌ Invalid server environment variables:");
    const errors = parsedServer.error.format() as ZodErrorFormat;
    for (const key in errors) {
      if (key === "_errors") continue;
      console.error(
        `- ${key}: ${
          "_errors" in errors[key]
            ? (errors[key] as ZodErrorFormat)._errors.join(", ")
            : (errors[key] as string[]).join(", ")
        }`
      );
    }
    throw new Error("Invalid server environment variables");
  }

  /**
   * Validate client-side environment variables against schema
   * Performs Zod schema validation and provides detailed error messages
   * @param clientVars - The client environment variables to validate
   * @param _clientSchema - The Zod schema to validate against
   * @throws Error if validation fails, with console output showing specific issues
   * @returns The validated client environment variables
   */
  const parsedClient = _clientSchema.safeParse(clientVars);
  if (!parsedClient.success) {
    console.error("❌ Invalid client environment variables:");
    const errors = parsedClient.error.format() as ZodErrorFormat;
    for (const key in errors) {
      if (key === "_errors") continue;
      console.error(
        `- ${key}: ${
          "_errors" in errors[key]
            ? (errors[key] as ZodErrorFormat)._errors.join(", ")
            : (errors[key] as string[]).join(", ")
        }`
      );
    }
    throw new Error("Invalid client environment variables");
  }

  return {
    ...parsedServer.data,
    ...parsedClient.data,
  } as EnvValidationResult<TServer, TClient>;
}

export { createEnv };
