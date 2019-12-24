import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import { tvApi } from 'api';

const Container = styled('div')`
  padding: 20px;
`;

const TV = () => {
  const [result, setResult] = useState({
    topRated: null,
    airingToday: null,
    popular: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getResult = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      setResult({
        topRated,
        airingToday,
        popular,
      });
    } catch {
      setError("Can't find anything");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return loading ? (
    <Loader />
  ) : (
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

export default TV;
