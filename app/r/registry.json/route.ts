import { loadRegistry } from "shadcn/registry";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const registry = await loadRegistry({
      cwd: process.cwd(),
      registryFile: "registry.json",
    });
    return NextResponse.json(registry);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load registry" },
      { status: 500 }
    );
  }
}