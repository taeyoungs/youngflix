import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';

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

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  handleSubmit,
  updateTerm,
  loading,
  error,
}) => (
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
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map(movie => (
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
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Show Results">
            {tvResults.map(show => (
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
        {movieResults &&
          tvResults &&
          movieResults.length === 0 &&
          tvResults.length === 0 && (
            <Message color="#bdc3c7" text="Nothing Found" notFound />
          )}
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
