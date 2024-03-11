export interface ImageType {
  albumImageUUID: string;
  location: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  rotation: number;
}

export interface UserInfoType {
  userUUID: string;
  nickname: string;
  profileImageURL: string | null;
  friends: FriendsType[];
}

export interface UserAlbumListType {
  albums: AlbumsType[];
  collaboAlbums: AlbumsType[];
}

export interface UserNotificationType {
  friendRequesters: FriendsType[];
  albumInviters: AlbumsType[];
}

export interface FriendsType {
  nickname: string;
  userUUID: string;
  profileImageURL: string | null;
  type?: string;
}

export interface AlbumsType {
  albumUUID: string;
  albumName: string;
  thumbnailImageURL: string;
  images: ImageType[];
  createdDate: string;
  lastModifiedDate: string;
}

export interface AlbumDetailInfoType {
  albumName: string;
  thumbnailImageURL: string;
  createdDate: string;
  isPublic: boolean;
}

export interface SearchUsersType {
  friend: {
    nickname: string;
    userUUID: string;
    profileImageURL: string | null;
  };
  friendStatus: string;
}
