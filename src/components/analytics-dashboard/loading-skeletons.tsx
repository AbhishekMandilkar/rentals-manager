import {Card, CardContent, CardHeader} from "../ui/card";
import {Skeleton} from "../ui/skeleton";

const CardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[150px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-3 w-[120px] mt-2" />
      </CardContent>
    </Card>
  );
  
  const ChartSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-[350px] w-full" />
    </div>
  );
  
  const TableSkeleton = () => (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
  
  export { CardSkeleton, ChartSkeleton, TableSkeleton };
  