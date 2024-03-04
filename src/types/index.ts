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
  nickname: string;
  profileImageUrl: string | null;
  friends: FriendsType[];
  albums: AlbumsType[];
  collaboAlbums: AlbumsType[];
  sentFriendRequest: FriendsType[];
  receivedFriendRequest: FriendsType[];
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
  thumbnailImage: string;
  images: ImageType[];
  albumEditors: any;
  createdDate: any;
}

export interface SearchUsersType {
  friend: {
    nickname: string;
    userUUID: string;
    profileImageURL: string | null;
  };
  friendStatus: string;
}
