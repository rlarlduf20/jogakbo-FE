"use client";

import Image from "next/image";
import LandingAlbumImage from "../../../public/images/landing-album.png";
import LandingJogakboImage from "../../../public/images/landing-jogakbo.png";
import LandingDiagramImage from "../../../public/images/landing-diagram.png";
import useScrollAppear from "@/hooks/useScrollAppear";

const MotiveSection = () => {
  return (
    <section className="w-full h-[2000px] pt-[144px]">
      <div className="flex w-[760px] gap-[141px] mx-auto mb-[97px]">
        <div {...useScrollAppear("up", 1, 0)}>
          <Image src={LandingAlbumImage} alt="앨범" />
          <p className="text-[20px]">
            <span className="font-semibold">앨범, 사진첩</span>
            <br />: 사진을 붙여 정리, 보존하기 위한 책.
          </p>
        </div>
        <div {...useScrollAppear("up", 1, 0.5)}>
          <Image src={LandingJogakboImage} alt="조각보" />
          <p className="text-[20px]">
            <span className="font-semibold">조각보</span>
            <br />: 여러 조각의 헝겊을 대어서 만든 보자기.
          </p>
        </div>
      </div>
      <p
        className="text-[18px] text-center mb-[250px]"
        {...useScrollAppear("up", 1, 0.5)}
      >
        서로 다른 조각으로 하나의 보자기를 만드듯 여러 사진을 모아 정리한 앨범도
        조각보와 같다고 생각했습니다.
        <br />
        온라인에서도 흩어진 사진들을 한 데 모아 추억으로 간직하고 함께 꾸미는
        경험을 나누고자 조각보를 만들었습니다.
      </p>
      <div
        className="w-[785px] mx-auto"
        {...useScrollAppear("left", 1, 0, 0.2)}
      >
        <Image src={LandingDiagramImage} alt="다이어그램" />
      </div>
    </section>
  );
};

export default MotiveSection;
