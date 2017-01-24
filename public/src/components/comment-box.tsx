import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CommentList from './comment-list';
import CommentForm from './comment-form';
import 'whatwg-fetch';

interface CommentDataItem {
  id: number
  author: string
  text: string
}
interface CommentBoxProps {
  url: string
  pollInterval: number
  comments: Array<CommentDataItem>
  setComments: Function
}

export default class CommentBox extends React.Component<CommentBoxProps, any>{

  static propTypes = {
    setComments : React.PropTypes.func.isRequired,
    comments : React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.url.length > 0){
      this.loadCommentsFromServer();
      setInterval( () => this.loadCommentsFromServer(), this.props.pollInterval);
    }
  }

  loadCommentsFromServer() {

    // cf. http://fetch-api-sample.azurewebsites.net/demo03.html
    fetch(this.props.url)
      .then(handleErrors)
      .then(prepare)
      .then(onFulfilled.bind(this))
      .catch(onRejected);

  }

  handleCommentSubmit(comment) {
    let comments = this.props.comments;
    comment.id = Date.now();

    let newComments = comments.concat([comment]);
    this.props.setComments(newComments)

    if (this.props.url.length > 0){

      fetch(this.props.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then(handleErrors)
      .then(prepare)
      .then(onFulfilled.bind(this))
      .catch(onRejectedPOST.bind(this));

    }
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.comments} />
        <CommentForm onCommentSubmit={(e) => this.handleCommentSubmit(e)} />
      </div>
    );
  }
};

function handleErrors(response) {
  if (!response.ok) {
    return response.json().then(function(err) {
      throw Error(err.message);
    });
  } else {
    return response;
  }
}
function prepare(response) {
  /*
  console.info('ok?: ', response.ok);
  console.info('status: ', response.status);
  console.info('statusText: ', response.statusText);
  */
  return response.json();
}
function onFulfilled(data) {
  /*
  let message = ([
    '成功ハンドラで処理されました。',
    'data: ' + JSON.stringify(data, null, '  '),
  ]).join('\n');
  console.log(message);
  */
  this.props.setComments(data)
}
function onRejected(err) {
  var message = ([
    '失敗ハンドラで処理されました。',
    'error: ' + err.message,
  ]).join('\n');
  console.error(err);
  console.log(message);
}
function onRejectedPOST(err) {
  this.setState({data: this.props.comments});
  onRejected(err);
}
