import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'Components/Loader';
import Section from 'Components/Section';

const Container = styled('div')`
  padding: 0px 10px;
`;

const TVPresenter = ({ topRated, airingToday, popular, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map(show => show.name)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => show.name)}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map(show => show.name)}
        </Section>
      )}
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
