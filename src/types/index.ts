export interface ImageType {
  imageUUID: string;
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
  nickname: string;
  profileImageUrl: string | null;
  friends: FriendsType[];
  albums: AlbumsType[];
}

export interface FriendsType {
  nickname: string;
  socialId: string;
  profileImageUrl: string | null;
}

export interface AlbumsType {
  albumID: string;
  albumName: string;
  images: ImageType[];
  albumEditors: any;
}
