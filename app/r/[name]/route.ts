import { loadRegistryItem } from "shadcn/registry";
import { NextResponse } from "next/server";
import { expandRegistryDependencies } from "@/lib/registry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const itemName = name.replace(/\.json$/, "");
  try {
    const item = await loadRegistryItem(itemName, {
      cwd: process.cwd(),
      registryFile: "registry.json",
    });
    const expanded = await expandRegistryDependencies(item, request.url);
    return NextResponse.json(expanded);
  } catch (error: any) {
    console.error(error);
    if (error?.message?.includes("not found")) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to load registry item" },
      { status: 500 }
    );
  }
}
