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

const AlbumSection = () => {
  const [page, setPage] = useState<number>(0);
  const [albumBodyData, setAlbumBodyData] = useState<ImageType[][]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const client = useRef<any>({});
  const { data: session } = useSession();

  useEffect(() => {
    let accessToken = session?.jogakTokens.accessToken;
    client.current = new Client({
      brokerURL: `ws://${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/album-ws`,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log("연결 성공");
        client.current.subscribe("/topic/sub", (body: any) => {
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
  }, [session]);

  useEffect(() => {
    const stage = stageRef.current?.getStage();
    const pushData = async (data: any, formData: any) => {
      // setAlbumBodyData((prevData: any) => {
      //   const newData = [...prevData];
      //   newData[page] = newData[page].concat(data);

      //   return newData;
      // });
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/album/img/1`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.jogakTokens.accessToken}`,
        },
      });

      // const resJson = await res.json();
      // setAlbumBodyData(resJson);
    };

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
        const dropImgInfo = await parsingImagesSize(
          files,
          stageRef.current?.getPointerPosition()
        );
        const formData = new FormData();
        let fileInfo: any = [];

        for (let i = 0; i < files.length; i++) {
          let obj = {
            page: page,
            size: dropImgInfo[i].size,
            location: dropImgInfo[i].location,
            rotation: 0,
          };
          formData.append(`multipartFiles`, files[i]);

          fileInfo.push(obj);
        }
        formData.append("fileInfos", JSON.stringify(fileInfo));
        pushData(dropImgInfo, formData);
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
  }, [page, session?.jogakTokens.accessToken]);

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
      destination: "/app/img",
      body: msg,
    });
  };
  const handleNextBtnClick = async () => {
    if (!albumBodyData[page] || albumBodyData[page].length === 0) {
      alert("페이지 추가를 위해서는 적어도 한장의 사진이 필요합니다.");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/album/page`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.jogakTokens.accessToken}`,
        },
      }
    );
    if (!res.ok) {
      alert("에러가 발생했습니다. 다시 시도해주세요.");
      console.error(res);
      return;
    }
    setSelectedImageId(null);
    setPage((prev) => prev + 1);
  };
  return (
    <section className="relative pb-[80px]">
      <AlbumInfo
        page={page}
        movePrevPage={() => {
          setSelectedImageId(null);
          setPage((prev) => prev - 1);
        }}
        moveNextPage={handleNextBtnClick}
      />
      <Stage
        width={1200}
        height={800}
        className={`${isDragging ? "border-4" : "border-2"} bg-white`}
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
              key={item.imageUUID}
              selectedImageId={selectedImageId}
              isSelected={item.imageUUID === selectedImageId}
              onSelect={() => {
                setSelectedImageId(item.imageUUID);
              }}
              onChangeAttrs={(newAttrs: ImageType) => {
                // setAlbumBodyData((prevData) => {
                //   const newData = [...prevData];
                //   newData[page][index] = newAttrs;
                //   return newData;
                // });
                let arr = [];
                let obj = {
                  imageUUID: newAttrs.imageUUID,
                  imageInfo: {
                    page,
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
              // reLocArr={(newImageArr: ImageType[]) => {
              //   setAlbumBodyData((prevData) => {
              //     const newData = [...prevData];
              //     newData[page] = newImageArr;

              //     return newData;
              //   });
              // }}
            />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default AlbumSection;
