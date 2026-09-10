import { loadRegistry } from "shadcn/registry";
import { NextResponse } from "next/server";
import { expandRegistryDependencies } from "@/lib/registry";

export async function GET(request: Request) {
  try {
    const registry = await loadRegistry({
      cwd: process.cwd(),
      registryFile: "registry.json",
    });
    const items = registry.items?.map((item) =>
      expandRegistryDependencies(item, request.url),
    );
    return NextResponse.json({ ...registry, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load registry" },
      { status: 500 }
    );
  }
}