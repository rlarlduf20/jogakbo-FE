"use client";

import { useRef, useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "@/templates/AlbumSection/ImagesByPage";
import AlbumInfo from "@/templates/AlbumSection/AlbumInfo";
import type { ImageType } from "@/types";
import { parsingImagesSize } from "@/lib/getImgValue";
import LoadingGIF from "@/components/LoadingGIF";
import PagiNation from "./PagiNation";

const AlbumSection = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState<number>(0);
  const [albumName, setAlbumName] = useState<string>("");
  const [albumBodyData, setAlbumBodyData] = useState<ImageType[][]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);

  const stageRef = useRef<Konva.Stage>(null);
  const client = useRef<any>({});
  const { data: session } = useSession();

  useEffect(() => {
    let accessToken = session?.jogakTokens.accessToken;
    async function getInitData() {
      const res = await fetch("/api/albumInfo", {
        method: "POST",
        body: JSON.stringify({ albumID: params.id }),
      });
      const data = await res.json();
      setAlbumName(data.albumName);
      setAlbumBodyData(data.imagesInfo);
    }
    getInitData();
    client.current = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/album-ws`,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log("연결 성공");
        client.current.subscribe(`/sub/edit/${params.id}`, (body: any) => {
          const json_body = body.body;
          console.log("socket data", JSON.parse(json_body));
          setAlbumBodyData(JSON.parse(json_body));
        });
      },
    });
    client.current.activate();
    return () => {
      console.log("연결 해제");
      client.current.deactivate();
    };
  }, [session, params.id]);

  useEffect(() => {
    const stage = stageRef.current?.getStage();

    const handleDragOver = (e: any) => {
      setIsDragging(true);
      e.preventDefault();
    };
    const handleDragLeave = (e: any) => {
      setIsDragging(false);
      e.preventDefault();
    };
    const handleDrop = async (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      stageRef.current?.setPointersPositions(e);
      setIsDragging(false);

      const files = e.dataTransfer?.files;

      if (files) {
        const isImageFile = Array.from(files).every((file: any) =>
          file.type.includes("image")
        );
        if (!isImageFile) {
          alert("이미지 파일만 업로드 가능합니다.");
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        // 드랍한 외부 이미지 파일 정보 서버로 보내기
        setIsUpLoading(true);
        const dropImgInfo = await parsingImagesSize(
          files,
          stageRef.current?.getPointerPosition()
        );
        const formData = new FormData();
        let fileInfo: any = [];

        for (let i = 0; i < files.length; i++) {
          let obj = {
            pageNum: page,
            size: dropImgInfo[i].size,
            location: dropImgInfo[i].location,
            rotation: 0,
          };
          formData.append(`multipartFiles`, files[i]);

          fileInfo.push(obj);
        }
        formData.append("fileInfos", JSON.stringify(fileInfo));

        const res = await fetch(`/api/image/${params.id}`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
        setIsUpLoading(false);
      }
    };

    stage?.container().addEventListener("dragover", handleDragOver);
    stage?.container().addEventListener("drop", handleDrop);
    stage?.container().addEventListener("dragleave", handleDragLeave);

    return () => {
      stage?.container().removeEventListener("dragover", handleDragOver);
      stage?.container().removeEventListener("drop", handleDrop);
      stage?.container().removeEventListener("dragleave", handleDragLeave);
    };
  }, [page, session?.jogakTokens.accessToken, params.id]);

  const imageFocus = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedImageId(null);
    }
  };
  const publish = (msg: string) => {
    if (!client.current.connected) return;
    console.log("msg", msg);
    client.current.publish({
      destination: `/pub/edit/${params.id}`,
      body: msg,
    });
  };
  const handleNextBtnClick = async (isCreate: boolean) => {
    if (isCreate) {
      const res = await fetch("/api/newPage", {
        method: "POST",
        body: JSON.stringify({ albumID: params.id }),
      });
      if (!res.ok) {
        alert("에러가 발생했습니다. 다시 시도해주세요.");
        console.error(res);
        return;
      }
    }
    setSelectedImageId(null);
    setPage((prev) => prev + 1);
  };
  return (
    <section className="relative pb-[100px]">
      {isUpLoading && <LoadingGIF />}
      <AlbumInfo albumID={params.id} title={albumName} />
      <Stage
        width={1200}
        height={800}
        className={` ${isDragging && "border-[1px] border-white"} ${
          isDragging ? "bg-main_black" : "bg-[#303030]"
        } ${isDragging && "opacity-50"}`}
        ref={stageRef}
        onMouseDown={(e) => imageFocus(e)}
        onTouchStart={(e) => imageFocus(e)}
      >
        <Layer>
          {albumBodyData[page]?.map((item, index) => (
            <ImagesByPage
              bodyData={albumBodyData[page]}
              imageInfo={item}
              index={index}
              key={item.albumImageUUID}
              selectedImageId={selectedImageId}
              albumID={params.id}
              pageNum={page}
              isSelected={item.albumImageUUID === selectedImageId}
              onSelect={() => {
                setSelectedImageId(item.albumImageUUID);
              }}
              onChangeAttrs={(newAttrs: ImageType) => {
                let arr = [];
                let obj = {
                  albumImageUUID: newAttrs.albumImageUUID,
                  albumImageEditInfo: {
                    pageNum: page,
                    location: {
                      x: newAttrs.location.x,
                      y: newAttrs.location.y,
                    },
                    size: {
                      width: newAttrs.size.width,
                      height: newAttrs.size.height,
                    },
                    rotation: newAttrs.rotation,
                  },
                };
                arr.push(obj);
                publish(JSON.stringify(arr));
              }}
            />
          ))}
        </Layer>
      </Stage>
      <PagiNation
        page={page}
        albumSize={albumBodyData.length}
        movePrevPage={() => {
          setSelectedImageId(null);
          setPage((prev) => prev - 1);
        }}
        moveNextPage={handleNextBtnClick}
      />
    </section>
  );
};

export default AlbumSection;
