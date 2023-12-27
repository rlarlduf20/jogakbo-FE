"use client";
import { useRef, useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "./components/ImagesByPage";
import AlbumInfo from "./components/AlbumInfo";
import type { ImageType } from "./types";
import { parsingImagesSize } from "./lib/utils";

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
          console.log("받아오기 성공");
          const json_body = body.body;
          console.log("socket data", json_body);
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
  }, [page, albumBodyData, session?.jogakTokens.accessToken]);

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

    client.current.publish({
      destination: "/app/img",
      body: msg,
    });
  };
  return (
    <section>
      <AlbumInfo
        page={page}
        movePrevPage={() => {
          setSelectedImageId(null);
          setPage((prev) => prev - 1);
        }}
        moveNextPage={() => {
          setSelectedImageId(null);
          setPage((prev) => prev + 1);
        }}
      />
      <Stage
        width={1200}
        height={800}
        className={`${isDragging ? "border-4" : "border-2"}`}
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
                // setAlbumBodyData((prevData) => {
                //   const newData = [...prevData];
                //   newData[page][index] = newAttrs;
                //   return newData;
                // });
              }}
              reLocArr={(newImageArr: ImageType[]) => {
                setAlbumBodyData((prevData) => {
                  const newData = [...prevData];
                  newData[page] = newImageArr;

                  return newData;
                });
              }}
            />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default AlbumSection;
