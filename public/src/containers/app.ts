import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CommentBox from '../components/comment-box';
import * as commentActions from '../actions/comment-action';

function mapStateToProps(state) {
  return {
    url: '/api/comments',
    pollInterval: 2000,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(CommentBox)
