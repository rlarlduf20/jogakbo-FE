interface InfoPropType {
  page: number;
  movePrevPage: () => void;
  moveNextPage: () => void;
}

const AlbumInfo = ({ page, movePrevPage, moveNextPage }: InfoPropType) => {
  return (
    <div className="w-[1200px] flex">
      <button
        className={`${page > 1 && "hover:cursor-pointer"} ${
          page <= 1 && "text-slate-300"
        }`}
        disabled={page <= 1}
        onClick={movePrevPage}
      >
        이전
      </button>
      <input className="border-2 block m-auto" />
      <button className="hover:cursor-pointer" onClick={moveNextPage}>
        생성
      </button>
    </div>
  );
};

export default AlbumInfo;
