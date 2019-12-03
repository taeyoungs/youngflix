import React from 'react';
import CollectionPresenter from './CollectionPresenter';
import { movieApi } from 'api';

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    try {
      const { data: result } = await movieApi.collection(parsedId);
      this.setState({
        result,
      });
    } catch {
      this.setState({
        error: "Can't find movie information",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return (
      <CollectionPresenter result={result} error={error} loading={loading} />
    );
  }
}
