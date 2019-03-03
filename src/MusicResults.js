// import React from 'react';


// const MusicResults = (props) => {
//   // console.log(props);
//   return(
//     <div>
//       <h2>{props.title}</h2>
//       <p>{props.artist}</p>
//       <img src={props.src} alt={`Poster for ${props.title}.`} />
//       <a href={props.url}>Link to Music</a>
//     </div>
//   );
// };

// export default MusicResults;

  
import React, { Component } from 'react'

class MusicResults extends Component {
  renderSrc = () => {
    if (this.props.src.image) {
      return this.props.src.image[3]["#text"]
    }
  }

  renderSongList = () => {
    if (this.props.songs.tracks) {
      const topSongsList = this.props.songs.tracks.track.map(songs => {
        return (
        `${songs.name} ${songs.url}`
        //  this.props(songs)
        )
      })
      console.log(topSongsList);
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.artist}</p>
        <img src={this.renderSrc()} alt={`Poster for ${this.props.title}.`} />
        <a href={this.props.url}>Link to Music</a>
        <ul>
          <li>{this.renderSongList()}</li>
        </ul>
      </div>
    )
  }
}

export default MusicResults