import React from 'react';
import SearchPresenter from './SearchPresenter';
import { movieApi, tvApi } from 'api';

export default class extends React.Component {
  state = {
    error: null,
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm();
    }
  };

  updateTerm = event => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: 'Not Found' });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { error, loading, movieResults, tvResults, searchTerm } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        error={error}
        loading={loading}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
