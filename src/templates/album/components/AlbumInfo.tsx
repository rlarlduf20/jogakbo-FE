interface InfoPropType {
  page: number;
  movePrevPage: () => void;
  moveNextPage: () => void;
}

const AlbumInfo = ({ page, movePrevPage, moveNextPage }: InfoPropType) => {
  return (
    <div className="w-[1200px] flex">
      <button
        className={`${page > 0 && "hover:cursor-pointer"} ${
          page <= 0 && "text-slate-300"
        }`}
        disabled={page <= 0}
        onClick={movePrevPage}
      >
        이전
      </button>
      <input className="border-2 block m-auto" />
      <button className="hover:cursor-pointer" onClick={moveNextPage}>
        다음
      </button>
    </div>
  );
};

export default AlbumInfo;
