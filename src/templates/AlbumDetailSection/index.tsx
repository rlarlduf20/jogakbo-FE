import RouteButtons from "./RouteButtons";

interface AlbumDetailSectionPropsType {
  albumID: string;
}

const AlbumDetailSection = ({ albumID }: AlbumDetailSectionPropsType) => {
  return (
    <div className="w-[420px] h-[640px] border-[1px] border-white bg-main_black">
      <p>{albumID}</p>
      <RouteButtons albumID={albumID} />
    </div>
  );
};

export default AlbumDetailSection;
