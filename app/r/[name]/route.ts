import { NextResponse } from "next/server";
import { expandRegistryDependencies } from "@/lib/registry";
import registry from "../../../registry.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const itemName = name.replace(/\.json$/, "");
  try {
    const item = registry.items?.find(
      (i: any) => i.name === itemName
    );
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    const expanded = await expandRegistryDependencies(item, request.url);
    return NextResponse.json(expanded);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load registry item" },
      { status: 500 }
    );
  }
}
