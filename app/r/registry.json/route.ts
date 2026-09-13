import { NextResponse } from "next/server";
import { expandRegistryDependencies } from "@/lib/registry";
import registry from "../../../registry.json";

export async function GET(request: Request) {
  try {
    const items = await Promise.all(
      registry.items?.map((item: (typeof registry.items)[number]) =>
        expandRegistryDependencies(item, request.url),
      ) || []
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
