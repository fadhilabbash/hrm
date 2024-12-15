interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  text = "جار الحفظ..",
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center ${className || ""}`}>
      <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
      <span>{text}</span>
    </div>
  );
}
