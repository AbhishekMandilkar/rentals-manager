import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorAlert(props: { message: string; description?: string }) {
  const { message, description } = props;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{message || "Something went wrong"}</AlertTitle>
      <AlertDescription>
        {description || "Please try again later."}
      </AlertDescription>
    </Alert>
  );
}
