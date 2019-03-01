import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      isLoading: true,
      userInput: ''
    }
  }

  handleChange = (event) => {
    // event is change in input, target is input, value is what has been typed in input
    console.log(event.target.name);
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
    // reset the state so that the input is cleared out
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
      console.log(topMovie);
      this.setState({
        movie: topMovie,
        isLoading: false
      }, () => {
        console.log('here')
        this.getSongs()
      }
    )}).catch(error => {
      console.log(error);
    })
  }
  

  // Calling the Music API
  getSongs = () => {
    axios({
      method: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0',
      dataResponse: 'json',
      params: {
        api_key: '57ee3318536b23ee81d6b27e36997cde',
        format: 'json',
        method: 'album.search',
        album: this.state.movie.original_title
      }
    }).then(response => {
      console.log(response);
      // this.setState({movies: response});
      // console.log(response);
      // this.setState({
      //   movies: response,
      //   isLoading: false
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
            // the name attribute here is used to make the handleChange method reusable
            name="userInput"
            // we're binding the value of this input to the value that exists for it in state
            value={this.state.userInput} />
          <button type="submit">Search your movie</button>
        </form>

      </div>
    );
  }
}

export default App;
