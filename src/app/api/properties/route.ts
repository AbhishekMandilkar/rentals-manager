import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  createProperty,
  deleteProperty,
  searchProperties,
  updateProperty,
} from "@/services/properties/properties";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const formattedProperties = await searchProperties({
      prisma,
      searchParams,
      userId: request.headers.get("userId"),
    });

    return NextResponse.json(formattedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newProperty = await createProperty({
      prisma,
      body,
      userId: request.headers.get("userId"),
    });

    return NextResponse.json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const userId = request.headers.get("userId");

    const updatedProperty = await updateProperty({
      prisma,
      body,
      userId,
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const deletedProperty = await deleteProperty({
      prisma,
      body,
      userId: request.headers.get("userId"),
    });
    return NextResponse.json(deletedProperty);
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
