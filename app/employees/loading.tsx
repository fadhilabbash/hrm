import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const Loading = () => {
  return (
    <LoadingSpinner
      wrapperClass="h-screen w-full flex items-center justify-center"
      spinnerClass="h-8 w-8"
    />
  );
};
export default Loading;
