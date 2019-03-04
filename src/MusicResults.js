import React, { Component } from 'react'
import Play from './assets/play.png';

class MusicResults extends Component {
  // checks to see if the image exists. If it does return the album image
  renderSrc = () => {
    if (this.props.src.image) {
      return this.props.src.image[3]["#text"]
    }
  }
  
  // checks to see if the album tracks exist. If so print the album track names
  renderSongList = () => {
    if (this.props.songs.track) {
      return this.props.songs.track.map(track => {
        return (
          <div>
            <li key={track['@attr'].rank}><a href={track.url}>{track.name}</a></li>
          </div>
        )
      })
    }
  }

  render() {
      if (!this.props.title) {
        return null;
      }

    return (
        <div className="MusicContainer">
          <div className="MusicImageContainer">
            <div className="MusicBox1">
              <a href={this.props.url} className="MusicLink">
                <img src={this.renderSrc()} alt={`Poster for ${this.props.title}.`} />
                <img src={Play} alt="Play button image" className="Play"/>
              </a>
            </div>
            <div className="MusicBox2">
              <h2>Tracklist</h2>
              <ol>
                {this.renderSongList()}
              </ol>
            </div>
          </div>
        </div>
    )
  }
}

export default MusicResults