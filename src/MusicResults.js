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
  // checks to see if the image exists. If it does return the album image
  renderSrc = () => {
    if (this.props.src.image) {
      return this.props.src.image[3]["#text"]
    }
  }

  // checks to see if the album tracks exist. If so print the album track names
  renderSongList = () => {
    if (this.props.songs.tracks) {
      const topSongList = this.props.songs.tracks.track.map(songs => {
      // const topSongList = this.props.albumSongs.map(songs => {
        return (
        <li> ${songs.name} ${songs.url} </li>
        )
      })
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
          {this.renderSongList()}
        </ul>
      </div>
    )
  }
}

export default MusicResults