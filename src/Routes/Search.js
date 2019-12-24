import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import { movieApi, tvApi } from 'api';

const Container = styled('div')`
  padding: 20px;
`;

const Form = styled('form')`
  width: 100%;
  margin-bottom: 50px;
`;

const Input = styled('input')`
  all: unset;
  width: 100%;
  font-size: 19px;
`;

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState({
    movieResults: null,
    tvResults: null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (searchTerm !== '') {
      getResult();
    }
  };

  const updateTerm = event => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  const getResult = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setResult({
        movieResults,
        tvResults,
      });
    } catch {
      setError('Not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows"
          value={searchTerm}
          onChange={updateTerm}
        ></Input>
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {result.movieResults && result.movieResults.length > 0 && (
            <Section title="Movie Results">
              {result.movieResults.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  rating={movie.vote_average}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {result.tvResults && result.tvResults.length > 0 && (
            <Section title="TV Show Results">
              {result.tvResults.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                  rating={show.vote_average}
                />
              ))}
            </Section>
          )}
          {result.movieResults &&
            result.tvResults &&
            result.movieResults.length === 0 &&
            result.tvResults.length === 0 && (
              <Message color="#bdc3c7" text="Nothing Found" notFound />
            )}
        </>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

export default Search;
