interface PostPhotoURL {
  original: string;
}

interface Comments {
  userName: string;
  userPhotoURL: string;
  userId: string;
}

export interface Posts {
  postId: string;
  userName: string;
  userPhotoURL: string;
  userId: string;
  date: string;
  feeling: string;
  caption: string;
  postPhotoURL: PostPhotoURL[];
  likes: number;
  comments: Comments[];
}
