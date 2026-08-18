import { format } from "prettier";

/** Format a source string with prettier using a stable, TSX-friendly preset. */
export async function formatCode(source: string, _preset?: string): Promise<string> {
  try {
    return await format(source, {
      parser: "typescript",
      semi: true,
      singleQuote: false,
      trailingComma: "es5",
      tabWidth: 2,
      printWidth: 80,
    });
  } catch {
    return source;
  }
}