import React from 'react';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component {
  state = {
    error: null,
    loading: false,
    movieResult: null,
    tvResult: null,
  };
  render() {
    const { error, loading, movieResult, tvResult } = this.state;
    return (
      <SearchPresenter
        movieResult={movieResult}
        tvResult={tvResult}
        error={error}
        loading={loading}
      />
    );
  }
}
