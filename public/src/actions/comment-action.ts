export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_COMMENTS = "SET_COMMENTS"

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    comments
  };
}
