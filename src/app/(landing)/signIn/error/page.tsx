import Image from "next/image";
import ErrorLogo from "../../../../../public/images/error.png";
import SignButton from "@/components/SignButton";

const SignError = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center gap-[35px] mt-[-80px]">
      <Image src={ErrorLogo} alt="에러" />
      <p className="text-[20px]">로그인에 실패했습니다. 다시 시도해주세요.</p>
      <SignButton />
    </section>
  );
};

export default SignError;
