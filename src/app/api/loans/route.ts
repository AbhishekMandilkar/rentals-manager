import {NextRequest} from "next/server";
import {createOrUpdateLoans} from "@/services/lendings/create-or-update-lendings";
import {searchLendings} from "@/services/lendings/search-lendings";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth()
  req.headers.set("userId", userId as string)
  return createOrUpdateLoans(req, prisma);
}

export async function GET(request: NextRequest) {
  return searchLendings(request, prisma);
}


