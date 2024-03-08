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

export interface UserType {
  userUUID: string;
  nickname: string;
  profileImageURL: string | null;
  friends: FriendsType[];
  albums: AlbumsType[];
  collaboAlbums: AlbumsType[];
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

export interface SearchUsersType {
  friend: {
    nickname: string;
    userUUID: string;
    profileImageURL: string | null;
  };
  friendStatus: string;
}
