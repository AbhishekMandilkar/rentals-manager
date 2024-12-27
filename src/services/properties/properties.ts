import { APIRequestParams, PropertyErrorCode } from "@/interfaces";
import { properties } from "@prisma/client";

export const searchProperties = async (
  params: APIRequestParams<properties>
) => {
  const { prisma, searchParams } = params;
  const search = searchParams?.get("search") || "";
  const isRented = (searchParams?.get("isRented") || "")  === "true";
  const properties = await prisma.properties.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      isDeleted: false,
      ...(isRented && {
        rent: {
          some: {
            isDeleted: false,
          },
        },
      }),
    },
    include: {
      rent: {
        where: {
          isDeleted: false,
        },
        take: 1,
      },
    },
  });

  const formattedProperties = properties.map((property) => ({
    id: property.id,
    name: property.name,
    active: property.rent.length > 0,
  }));

  return formattedProperties;
};

export const createProperty = async (params: APIRequestParams<properties>) => {
  const { body, prisma } = params;
  const { name, userId } = body as properties;

  const existingProperty = await prisma.properties.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
      userId,
      isDeleted: false,
    },
  });

  if (existingProperty) {
    throw new Error(PropertyErrorCode.PROPERTY_NAME_EXISTS);
  }

  const newProperty = await prisma.properties.create({
    data: {
      name,
      userId,
      active: false,
    },
  });

  return newProperty;
};

export const updateProperty = async (params: APIRequestParams<properties>) => {
  const { body, prisma } = params;
  const { id, ...data } = body as properties;
  const existingProperty = await prisma.properties.findUnique({
    where: { id },
    include: { rent: true },
  });

  if (!existingProperty) {
    throw new Error(PropertyErrorCode.PROPERTY_NOT_FOUND);
  }

  const updatedProperty = await prisma.properties.update({
    where: { id },
    data,
  });

  return updatedProperty;
};

export const deleteProperty = async (params: APIRequestParams<properties>) => {
  const { prisma, body } = params;
  const { id } = body as properties; 

  const existingProperty = await prisma.properties.findUnique({
    where: { id },
    include: { rent: { where: { isDeleted: false } } },
  });

  if (!existingProperty) {
    throw new Error(PropertyErrorCode.PROPERTY_NOT_FOUND);
  }

  if (existingProperty.rent.length > 0) {
    throw new Error(PropertyErrorCode.PROPERTY_RENT_EXISTS);
  }

  const deletedProperty = await prisma.properties.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deletedProperty;
};
