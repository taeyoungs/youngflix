import React, { useState, useEffect } from 'react';
import { movieApi } from 'api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled('div')`
  padding: 20px;
`;

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    popular: null,
    upcoming: null,
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      setResult({
        nowPlaying,
        popular,
        upcoming,
      });
    } catch (error) {
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

export default Home;
