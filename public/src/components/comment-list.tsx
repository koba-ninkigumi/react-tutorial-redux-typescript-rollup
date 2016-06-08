import * as React from 'react'
import Comment from './comment';

interface CommentDataItem {
  id: number
  author: string
  text: string
}
interface CommentListProps {
  data: CommentDataItem[]
}
interface CommentListState {}

export default class CommentList extends React.Component<CommentListProps, CommentListState>{
  render() {
    let commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
};
