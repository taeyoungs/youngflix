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

const TVContent = ({ result, error }) => {
  return (
    <Container>
      <Helmet>
        <title>TV Shows | Youngflix</title>
      </Helmet>
      {result.topRated && result.topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {result.topRated.map(show => (
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
      {result.popular && result.popular.length > 0 && (
        <Section title="Popular Shows">
          {result.popular.map(show => (
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
      {result.airingToday && result.airingToday.length > 0 && (
        <Section title="Airing Today">
          {result.airingToday.map(show => (
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
};

TVContent.propTypes = {
  result: PropTypes.shape({
    topRated: PropTypes.array,
    airingToday: PropTypes.array,
    popular: PropTypes.array,
  }),
  error: PropTypes.string,
};

export default TVContent;
