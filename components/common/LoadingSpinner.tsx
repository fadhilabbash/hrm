interface LoadingSpinnerProps {
  text?: string;
  containerClass?: string;
  spinnerClass?: string;
}

export function LoadingSpinner({
  text = "",
  containerClass,
  spinnerClass="h-4 w-4",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center ${containerClass || ""}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-500 border-t-transparent ${spinnerClass || ""}`}
      ></div>
      <span>{text}</span>
    </div>
  );
}
