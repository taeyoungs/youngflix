import React from 'react';
import DetailPresenter from './DetailPresenter';
import { movieApi, tvApi } from 'api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = this.props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = Number(id);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
      }
    } catch {
      this.setState({
        error: "Can't find Anything",
      });
    } finally {
      this.setState({
        loading: false,
        result,
        detailId: id,
      });
    }
  }

  render() {
    const { result, error, loading, isMovie, detailId } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        isMovie={isMovie}
        detailId={detailId}
      />
    );
  }
}
