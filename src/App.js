import React, { Component } from 'react';
import './setup.css';
import './App.css';
import axios from 'axios';
import MovieResults from './MovieResults.js';
import MusicResults from './MusicResults.js';
import AnchorLink from 'react-anchor-link-smooth-scroll';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      album: [],
      albumSongs: [],
      isLoading: true,
      userInput: '',
      showResults: false
    }
  }

  handleChange = (event) => {
    // when onChange occurs, target the input's value
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getMovies();
    this.setState({
      userInput: '',
      showResults: true
    })
  }


  //Calling the Movie API
  getMovies = () => {
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      dataResponse: 'json',
      params: {
        api_key: 'e021e067e5e5ac3d8119c6435b40558c',
        format: 'json',
        language: 'en-US',
        query: this.state.userInput
      }
    }).then(res => {
      const topMovie = res.data.results[0];
      this.setState({
        movie: topMovie,
        isLoading: false
      }, () => {
        this.getAlbums()
      }
    )}).catch(err => {
      console.log(err);
    })
  }
  

  // Calling the Music API
  getAlbums = () => {
    axios({
      method: 'GET',
      url: 'https://ws.audioscrobbler.com/2.0',
      dataResponse: 'json',
      params: {
        api_key: '57ee3318536b23ee81d6b27e36997cde',
        format: 'json',
        method: 'album.search',
        album: this.state.movie.original_title
      }
    }).then(res => {
      const albumList = res.data.results.albummatches.album[0];
      // const albumList = res.data.results.albummatches.album.map(value => {
      //   return albumList = value.splice(0,5)
      // });
      // console.log(albumList);
      this.setState({
        album: albumList,
        isLoading: false
      }, () => {
        this.getAlbumSongs()
        // console.log('here')
      }
      )
    }).catch(err => {
      console.log(err);
    })
  }
 

  // Calling the Music API for Song list
  getAlbumSongs = () => {
    axios({
      method: 'GET',
      url: 'https://ws.audioscrobbler.com/2.0',
      dataResponse: 'json',
      params: {
        api_key: '57ee3318536b23ee81d6b27e36997cde',
        format: 'json',
        method: 'album.getInfo',
        album: this.state.album.name,
        artist: this.state.album.artist
      }
    }).then(res => {
      console.log(res);
      const albumSongsResults = res.data.album.tracks;
      console.log(albumSongsResults);
      this.setState({
        albumSongs: albumSongsResults
      })
    })
  }


  render() {
    return (
      <div className="App">
        <header>
          <div className="Wrapper">
            <div className="Container">
              <h1>Find An Epic Soundtrack</h1>
              <form action="submit" onSubmit={this.handleSubmit}href="#topResults">
                <input
                  type="text"
                  placeholder="Type a movie"
                  onChange={this.handleChange}
                  name="userInput"
                  value={this.state.userInput} 
                />
              </form>
            </div>
          </div>
        </header>

        <div className="Wrapper">
          <div className="Title" id="topResults">
              <h2>{this.state.album.name}</h2>
              <p>{this.state.album.artist}</p>
          </div>
          <div className="Results">
            <MovieResults 
              title={this.state.movie.original_title}
              src={this.state.movie.poster_path} 
            />
            <MusicResults
              title={this.state.album.name}
              artist={this.state.album.artist}
              src={this.state.album}
              url={this.state.album.url}
              songs={this.state.albumSongs}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
