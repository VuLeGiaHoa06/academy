import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, RocketIcon, Terminal, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  requiredFieldsCount: number;
  missingFieldsCount: number;
  isCompleted: boolean;
}

const AlertBanner = ({
  requiredFieldsCount,
  missingFieldsCount,
  isCompleted,
}: AlertBannerProps) => {
  return (
    <Alert
      className="flex items-center gap-2"
      variant={`${isCompleted ? "complete" : "destructive"}`}
    >
      {isCompleted ? (
        <RocketIcon className="h-6 w-6" />
      ) : (
        <TriangleAlert className="h-6 w-6" />
      )}
      <div className="flex flex-col">
        <AlertTitle className="text-xs font-medium">
          {missingFieldsCount} missing field(s) / {requiredFieldsCount} required
          field(s)
        </AlertTitle>
        <AlertDescription className="text-xs">
          {isCompleted
            ? "Great job! Ready to publish"
            : "You can only publish when all the required fields are completed"}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertBanner;
