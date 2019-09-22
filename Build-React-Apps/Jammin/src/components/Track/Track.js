import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction(isRemoval) {
    return (isRemoval
      ? <a className="Track-action" onClick={this.removeTrack}>-</a>
      : <a className="Track-action" onClick={this.addTrack}>+</a>);
  }

  /*
  if (isRemoval == true) {
    console.log('<a className="Track-action">-</a>');
  } else if (isRemoval == false) {
    console.log('<a className="Track-action">+</a>');
  } //OR ^^
  */

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.trackName}
          </h3>
          <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
        </div>
        <a className="Track-action">
          {this.renderAction(this.props.isRemoval)}
        </a>

      </div>
    );
  }
};
// a className=Track-Action
//simply this.renderAction
//Could be this.props.track ^^ >>}
export default Track;
