import Link from "next/link";

const SignButton = () => {
  return <Link href={"/api/auth/signin"}>로그인/가입</Link>;
};

export default SignButton;
