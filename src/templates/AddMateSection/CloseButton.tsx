import { useRouter } from "next/navigation";
import { TrapeButton } from "@/components/Trapezoid";
const CloseButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <TrapeButton type="outline" handleClick={handleBack} styles="mx-auto">
      닫기
    </TrapeButton>
  );
};

export default CloseButton;
