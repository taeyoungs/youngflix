import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Container = styled('div')``;

const Rating = styled('div')`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Image = styled('div')`
  background-image: url(${props => `${props.imageUrl}`});
  height: 180px;
  background-size: cover;
  background-position: center;
  transition: opacity 0.1s linear;
  margin-bottom: 5px;
  border-radius: 3px;
`;

const ImageContainer = styled('div')`
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled('span')`
  display: block;
  margin-bottom: 5px;
`;

const Year = styled('span')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
`;

const Poster = ({ title, imageUrl, year, rating, id, isMovie = false }) => {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image
            imageUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w500${imageUrl}`
                : require('../assets/noPoster.png')
            }
          />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>{' '}
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  );
};

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  year: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

export default Poster;
