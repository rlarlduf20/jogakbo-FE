interface AlbumDetailSectionPropsType {
  albumID: string;
}

const AlbumDetailSection = ({ albumID }: AlbumDetailSectionPropsType) => {
  return <div>{albumID}</div>;
};

export default AlbumDetailSection;
