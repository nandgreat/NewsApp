import React from 'react';
import { Text, View } from 'react-native';

type MyComment = {
    id: string;
    content: string;
    author: string;
    createdAt: any;
    replies?: MyComment[];
  }

interface CommentProps {
  comment: MyComment;
}

export const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <View>
      <Text>{comment.content}</Text>
      {comment.replies?.map(reply => (
        <CommentComponent key={reply.id} comment={reply} />
      ))}
    </View>
  );
};