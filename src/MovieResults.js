import React from 'react';


const MovieResults = (props) => {

  if (!props.title) {
    return null;
  }

  return(
    <div>
      <h2>{props.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${props.src}`} alt={`Poster for ${props.title}.`} />
      <h2>{props.albumTitle}</h2>
    </div>
  );
};

export default MovieResults;

  