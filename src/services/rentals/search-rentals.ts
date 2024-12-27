import {Resources} from "@/interfaces";
import {Prisma, PrismaClient} from "@prisma/client";
import {getResourceRepaymentsMap} from "../repayments/repayments";

export async function searchRents(
    userId: string, 
    searchParams: {
      name?: string;
      propertyId?: string;
      contractEndDate?: 'asc' | 'desc';
      page?: number;
      pageSize?: number;
    },
    prisma: PrismaClient
   ) {
    const {
      name = '',
      propertyId,
      contractEndDate = 'asc',
      page = 1,
      pageSize = 10
    } = searchParams;
   
    const offset = (page - 1) * pageSize;
   
    const rentConditions: Prisma.rentFindManyArgs['where'] = {
      userId,
      AND: [
        name ? { name: { contains: name, mode: 'insensitive' } } : {},
        propertyId ? { propertyId } : {},
      ]
    };

    const rentOrderBy: Prisma.rentFindManyArgs['orderBy'] = [
      { contractEndDate: contractEndDate },
      { id: 'desc' }
    ];
   
    const [totalRents, rents] = await prisma.$transaction([
      // Count total matching records
      prisma.rent.count({ 
        where: rentConditions 
      }),
      
      // Fetch paginated and filtered rents
      prisma.rent.findMany({
        where: rentConditions,
        include: {
          property: true, // Include related property details
        },
        orderBy: rentOrderBy,
        take: pageSize,
        skip: offset,
      }),

    ]);
   
    const repaymentMap = await getResourceRepaymentsMap({
      resourceIds: rents.map((rent) => rent.id),
      resourceType: Resources.RENT,
      userId: userId,
    });

    return {
      rents: rents.map((rent) => {
        return {
          ...rent,
          repayment: repaymentMap.get(rent.id)?.[0],
        }
      }),
      pagination: {
        total: totalRents,
        page,
        pageSize,
        totalPages: Math.ceil(totalRents / pageSize)
      }
    };
   }