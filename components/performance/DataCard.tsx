import React from "react";

import { formatPrice } from "@/lib/formatPrice";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[14px] font-medium text-gray-500">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;

// why shouldFormat is optional value
// - because datacard use for 2 componennt is totalrevenue and total sales
// - totalsalse dont need to format
