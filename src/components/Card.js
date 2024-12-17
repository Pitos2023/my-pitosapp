import React from 'react';

const Card = ({ movie, imageWidth, imageHeight, eagerLoad }) => {
  return (
    <div className="card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}
        alt={movie.title}
        width={imageWidth}
        height={imageHeight}
        loading={eagerLoad ? 'eager' : 'lazy'}
      />
      <div className="card-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        {movie.imdbRating && (
          <div className="rating">
            <span>⭐ {movie.imdbRating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
