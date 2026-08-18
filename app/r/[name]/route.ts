import { loadRegistryItem } from "shadcn/registry";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const itemName = name.replace(/\.json$/, "");
  try {
    const item = await loadRegistryItem(itemName, {
      cwd: process.cwd(),
      registryFile: "registry.json",
    });
    return NextResponse.json(item);
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