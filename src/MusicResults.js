import React from 'react';


const MusicResults = (props) => {
  console.log(props);
  return(
    <div>
      <h2>{props.title}</h2>
      <p>{props.artist}</p>
      <img src={props.src} alt={`Poster for ${props.title}.`} />
      <a href={props.url}>Link to Music</a>
    </div>
  );
};

export default MusicResults;

  