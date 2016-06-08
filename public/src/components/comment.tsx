import * as React from 'react'
//import * as marked from 'marked';

declare function Remarkable():void;

export default class Comment extends React.Component<{author:string},void>{
  rawMarkup() {
    let md = new Remarkable();
    let rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
};
