import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css'

const SelectedSongCard = ({ song, artist, trackImg, onAddButtonClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {

  }, []);

  return (
    <div
      className={`song-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={trackImg} alt={`${song} - ${artist}`} className="album-art" />
      <div className="song-info">
        <h3 className="song-title">{song}</h3>
        <p className="artist-name">{artist}</p>
      </div>
      <button onClick={onAddButtonClick} className="remove-button">
        -
      </button>
    </div>
  );
};

SelectedSongCard.propTypes = {
  song: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  trackImg: PropTypes.string.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
};

export {SelectedSongCard};