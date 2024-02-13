import { useRouter } from "next/navigation";
import { TrapeButton } from "@/components/Trapezoid";

interface AddButtonPropsType {
  title: string;
  handleInputTitle: (v: string) => void;
  setIsLoading: any;
}

const AddButton = ({
  title,
  handleInputTitle,
  setIsLoading,
}: AddButtonPropsType) => {
  const router = useRouter();
  const handleClick = async () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/createAlbum", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    });

    if (!res.ok) {
      alert("다시 시도해주세요!");
      return;
    }
    const data = await res.text();
    handleInputTitle("");
    router.push(`/album/${data}`);
  };

  return <TrapeButton handleClick={handleClick}>만들기</TrapeButton>;
};

export default AddButton;
