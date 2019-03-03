import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MovieResults from './MovieResults.js';
import MusicResults from './MusicResults.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      album: [],
      albumSongs: [],
      isLoading: true,
      userInput: ''
    }
  }

  handleChange = (event) => {
    // event is change in input, target is input, value is what has been typed in input
    // console.log(event.target.name);
    // the argument passed to this function is the event ( a change in the input)
    // we set state using that input's name and value
    // (this makes the function reusable)
    this.setState({
      // userInput: event.target.value
      // if setting dynamic input you need to use [] on left
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.userInput);
    this.getMovies();
    this.setState({
      userInput: ''
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
      // console.log(response);
      const topMovie = res.data.results[0];
      // console.log(topMovie);
      this.setState({
        movie: topMovie,
        isLoading: false
      }, () => {
        // console.log('here')
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
      // console.log(res);
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
  //     })
  //   })
  // }

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
      const albumSongsResults = res.data.album.tracks.track;
      console.log(albumSongsResults);
      this.setState({
        albumSongs: albumSongsResults
      })
    })
  }


  // getBooks = () => {
  //   axios ({
  //     method: 'GET',
  //     url: 'https://www.goodreads.com/search/index.xml',
  //     dataResponse: 'xml',
  //     params: {
  //       key: 'u8UDpsytecKFoht1TJgA1Q',
  //       format: 'xml',
  //       language: 'en-US',
  //       q: this.state.movies
  //     }
  //   }).then(response => {
  //     console.log(response);
  //     response = response.data.results;
  //     console.log(response);
  //     // this.setState({
  //     //   movies: response,
  //     //   isLoading: false
  //   })
  // }




  render() {
    return (
      <div className="App">
      <h1>Your Movie!</h1>
        <form action="submit" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Movie title"
            onChange={this.handleChange}
            name="userInput"
            value={this.state.userInput} />
          <button type="submit">Search your movie</button>
        </form>
      <MovieResults 
        // key={}
        title={this.state.movie.original_title}
        src={this.state.movie.poster_path} 
      />
      <MusicResults
        // key={}
        title={this.state.album.name}
        artist={this.state.album.artist}
        // src={this.state.album.image[3]['#text']}
        src={this.state.album}
        url={this.state.album.url}
        songs={this.state.albumSongs}
        />
      {/* {
        this.state.albumSongs.tracks.track.map((songs) => {
          return (
            <MusicResults songs={songs} />
          )
        })
        } */}
        {/* // songs={this.state.albumSongs.tracks.track} */}

      </div>
    );
  }
}

export default App;
