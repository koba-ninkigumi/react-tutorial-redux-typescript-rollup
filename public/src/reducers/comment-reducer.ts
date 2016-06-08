import * as commentActions from '../actions/comment-action';

export default function commentReducer(state={comments : []}, action) {
  switch(action.type){
    case commentActions.ADD_COMMENT:
      return {comments: state.comments.concat([action.comment])}
    case commentActions.SET_COMMENTS:
      return {comments: action.comments}
    default:
      return state;
  }
}
