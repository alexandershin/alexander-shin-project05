import React, { Component } from 'react'

class MusicResults extends Component {
  // checks to see if the image exists. If it does return the album image
  renderSrc = () => {
    if (this.props.src.image) {
      return this.props.src.image[3]["#text"]
    }
  }

  // renderSongList = () => {
    //   if (this.props.songs.tracks) {
      //     const topSongList = this.props.songs.tracks.track.map(songs => {
        //     // const topSongList = this.props.albumSongs.map(songs => {
          //       return (
            //       <li> ${songs.name} ${songs.url} </li>
  //       )
  //     })
  //   }
  // }
  
  // checks to see if the album tracks exist. If so print the album track names
  renderSongList = () => {
    if (this.props.songs.track) {
      return this.props.songs.track.map((track, i) => {
        return (
          <div>
            <li id key={i}><a href={track.url}>{track.name}</a></li>
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
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.artist}</p>
        <img src={this.renderSrc()} alt={`Poster for ${this.props.title}.`} />
        <a href={this.props.url}>Link to Music</a>
        <h2>Tracklist</h2>
        <ol>
          {this.renderSongList()}
        </ol>
      </div>
    )
  }
}

export default MusicResults