import { PrismaClient } from "@prisma/client";

export enum Resources {
  LOAN = "LOAN",
  RENT = "RENT",
}

export interface APIRequestParams<T = unknown> {
  prisma: PrismaClient;
  userId: string | null | undefined;
  body?: T;
  searchParams?: URLSearchParams;
}

export enum PropertyErrorCode {
  PROPERTY_NOT_FOUND = "PROPERTY_NOT_FOUND",
  PROPERTY_NAME_EXISTS = "PROPERTY_NAME_EXISTS",
  PROPERTY_RENT_EXISTS = "PROPERTY_RENT_EXISTS",
}
