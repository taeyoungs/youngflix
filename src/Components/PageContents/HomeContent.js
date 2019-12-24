import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled('div')`
  padding: 20px;
`;

const HomeContent = ({ result, error }) => {
  return (
    <Container>
      <Helmet>
        <title>Movies | Youngflix</title>
      </Helmet>
      {result.nowPlaying && result.nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {result.nowPlaying.map(movie => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              imageUrl={movie.poster_path}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {result.upcoming && result.upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {result.upcoming.map(movie => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              imageUrl={movie.poster_path}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {result.popular && result.popular.length > 0 && (
        <Section title="Popular Movies">
          {result.popular.map(movie => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              imageUrl={movie.poster_path}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

HomeContent.propTypes = {
  result: PropTypes.shape({
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
  }),
  error: PropTypes.string,
};

export default HomeContent;
