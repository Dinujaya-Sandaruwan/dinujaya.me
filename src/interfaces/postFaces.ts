interface Comments {
  userName: string;
  userPhotoURL: string;
  userId: string;
  comment: string;
  commentId: string;
}

export interface Posts {
  postId: string;
  userName: string;
  userPhotoURL: string;
  userId: string;
  date: string;
  feeling: string;
  caption: string;
  postPhotoURL: string[];
  likes: number;
  comments: Comments[];
  isApproved: boolean;
}
