import React from 'react';

const Card = ({ movie, imageWidth = 300, imageHeight = 450, eagerLoad = false }) => {
  // Ensure we construct the image URL correctly from the poster_path
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'placeholder.jpg'; // Fallback placeholder image if no poster exists

  return (
    <div className="card">
      <img
        src={imageUrl}  // Use the correct image URL
        alt={movie.title}
        width={imageWidth}
        height={imageHeight}
        loading={eagerLoad ? 'eager' : 'lazy'}
      />
      <div className="card-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        {movie.vote_average && (
          <div className="rating">
            <span>⭐ {movie.vote_average}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
