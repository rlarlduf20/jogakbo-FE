import Link from "next/link";

const SignButton = () => {
  return (
    <Link href={"/api/auth/signin"} className="underline text-[14px]">
      조각보 시작하기
    </Link>
  );
};

export default SignButton;
