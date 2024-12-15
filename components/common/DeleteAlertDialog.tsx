import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteAlertDialogProps {
  icon?: React.ReactNode;
  triggerLabel?: string;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  icon,
  triggerLabel = "Show Dialog",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center">
          {icon}
          حذف
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
          <AlertDialogCancel onClick={onCancel}>
            {cancelLabel}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteAlertDialog;
