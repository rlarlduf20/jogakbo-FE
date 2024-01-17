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
  sentFriendRequest: FriendsType[];
  receivedFriendRequest: FriendsType[];
}

export interface FriendsType {
  nickname: string;
  socialID: string;
  profileImageUrl: string | null;
}

export interface AlbumsType {
  albumID: string;
  albumName: string;
  images: ImageType[];
  albumEditors: any;
}

export interface SearchUsersType {
  nickname: string;
  socialID: string;
  profileImageUrl: string | null;
}
