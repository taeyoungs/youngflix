import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled('div')`
  padding: 20px;
`;

const TVPresenter = ({ topRated, airingToday, popular, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              rating={show.vote_average}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              rating={show.vote_average}
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              rating={show.vote_average}
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
