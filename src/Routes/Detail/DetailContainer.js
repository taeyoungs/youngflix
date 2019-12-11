import React from 'react';
import DetailPresenter from './DetailPresenter';
import { movieApi, tvApi } from 'api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = this.props;
    this.overviewText = React.createRef();
    this.state = {
      result: null,
      error: null,
      loading: true,
      imdbId: null,
      isClick: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  handleClick = overview => {
    if (this.state.isClick) {
      this.overviewText.current.innerText = overview;
      this.setState({
        isClick: false,
      });
    } else {
      this.overviewText.current.innerText = `${overview.substring(0, 290)} •••`;
      this.setState({
        isClick: true,
      });
    }
  };

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
    let externalIds = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
        ({ data: externalIds } = await tvApi.imdb(parsedId));
      }
    } catch {
      this.setState({
        error: "Can't find Anything",
      });
    } finally {
      if (isMovie) {
        this.setState({
          loading: false,
          result,
          detailId: id,
        });
      } else {
        this.setState({
          loading: false,
          result,
          detailId: id,
          imdbId: externalIds.imdb_id,
        });
      }
    }
  }

  render() {
    const {
      result,
      error,
      loading,
      isMovie,
      detailId,
      imdbId,
      isClick,
    } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        isMovie={isMovie}
        detailId={detailId}
        imdbId={imdbId}
        isClick={isClick}
        handleClick={this.handleClick}
        textRef={this.overviewText}
      />
    );
  }
}
