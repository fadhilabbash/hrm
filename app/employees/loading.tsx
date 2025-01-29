import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner spinnerClass="h-8 w-8"/>
    </div>
  );
};
export default Loading;
