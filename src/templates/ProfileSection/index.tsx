import SignOutButton from "@/components/SignOutButton";
import Trapezoid from "@/components/Trapezoid";
import Link from "next/link";

const ProfileSection = () => {
  return (
    <section className="pt-[50px] w-full flex flex-col items-center gap-[50px]">
      <Trapezoid
        styles={{
          width: "240px",
          height: "240px",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
          bgColor: "white",
        }}
      />
      <SignOutButton />
      <Link href="/my">
        <Trapezoid
          styles={{
            width: "78px",
            height: "32px",
            clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 100%)",
            bgColor: "white",
          }}
        >
          <p className="text-main_black text-center pt-[7.5px]">닫기</p>
        </Trapezoid>
      </Link>
    </section>
  );
};

export default ProfileSection;
