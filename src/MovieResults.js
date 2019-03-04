import React from 'react';


const MovieResults = (props) => {

  if (!props.title) {
    return null;
  }

  return(
      <div className="MovieContainer">
        <img src={`https://image.tmdb.org/t/p/w500${props.src}`} alt={`Poster for ${props.title}.`} />
      </div>
  );
};

export default MovieResults;

  