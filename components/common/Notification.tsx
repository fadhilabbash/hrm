
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";

export const SuccessToast = (message?: string) => {
  toast({
    title: "إجراء مكتمل",
    description: (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span>{message || "تمت العملية بنجاح."}</span>
      </div>
    ),
  });
};

export const ErrorToast = (message?: string) => {
  toast({
    title: "خطأ",
    description: (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <AlertCircle className="h-5 w-5 text-white" />
        <span>{message || "حدث خطأ أثناء العملية."}</span>
      </div>
    ),
    variant: "destructive",
  });
};
