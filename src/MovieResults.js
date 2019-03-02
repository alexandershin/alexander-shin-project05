import React from 'react';

// class Results extends Component {
//   constructor() {
//     super();
//     this.state = {

//     }
//   }

//   render() {
//     console.log('RENDERED');
//     return (
//       <div>
//         {/* state is just an object stored in constructor, this.state reps Counter. */}
//         {/* accessing our Counter component's counter state value */}
//         <h1>{this.state.movie}</h1>
//         {/* function of the Counter class so need to use this.handleClick */}
//         {/* <button onClick={this.handleClick}>Click Me</button> */}
//       </div>
//     );
//   }
// }



const MovieResults = (props) => {
  console.log(props);
  return(
    <div>
      <h2>{props.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${props.src}`} alt={`Poster for ${props.title}.`} />
      {/* <img src={props.src} alt={props.title} /> */}

      <h2>{props.albumTitle}</h2>
    </div>
  );
};

export default MovieResults;

  