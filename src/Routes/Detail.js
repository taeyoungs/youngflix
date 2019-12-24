import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { FiClock, FiCalendar } from 'react-icons/fi';
import StarRatings from 'react-star-ratings';
import Loader from 'Components/Loader';
import VideoLinks from 'Components/VideoLinks';
import MovieTabs from 'Components/MovieTabs';
import ShowTabs from 'Components/ShowTabs';
import Message from 'Components/Message';
import { movieApi, tvApi } from 'api';

const Container = styled('div')`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 40px 30px;
  font-size: 15px;
`;

const Backdrop = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-position: top center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled('div')`
  display: flex;
  position: relative;
  width: 80%;
  height: 100%;
  z-index: 10;
  margin: 0 auto;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.8)
  );
`;

const Cover = styled('div')`
  width: 40%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin-right: 25px;
  mask-image: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(1, rgba(0, 0, 0, 1)),
    color-stop(0.5, rgba(0, 0, 0, 1)),
    color-stop(0, rgba(0, 0, 0, 0))
  );
`;

const Data = styled('div')`
  width: 60%;
`;

const Title = styled('div')`
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 45px;
  font-weight: 600;
`;

const ItemContainer = styled('div')`
  display: flex;
  align-items: center;
  margin: 10px 5px;
`;

const Item = styled('span')``;

const Divider = styled('span')`
  margin: 0px 10px;
`;

const OverviewContainer = styled('div')`
  margin-bottom: 20px;
`;

const Overview = styled('div')`
  padding: 10px;
  width: 75%;
  font-size: 17px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
`;

const OverviewBtn = styled('button')`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
  color: #f1c30f;
  font-size: 8px;
  margin-left: 10px;
  filter: drop-shadow(1px 1px 1px #f1c40f);
`;

const Imdb = styled('a')`
  display: flex;
  align-items: center;
`;

const ImdbImage = styled('img')`
  cursor: pointer;
`;

const VideoContainer = styled('div')`
  margin-bottom: 25px;
`;

const TabsContainer = styled('div')`
  height: 35%;
  width: 80%;
`;

const Detail = props => {
  const {
    location: { pathname },
  } = props;
  const overviewText = React.createRef();

  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isClick, setIsClick] = useState(true);

  let imdbId = null;
  const isMovie = pathname.includes('/movie/');

  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const handleClick = overview => {
    if (isClick) {
      overviewText.current.innerText = overview;
      setIsClick(false);
    } else {
      overviewText.current.innerText = `${overview.substring(0, 290)} •••`;
      setIsClick(true);
    }
  };

  const getResult = async () => {
    let result = null;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
        ({ data: imdbId } = await tvApi.imdb(parsedId));
      }
      setResult(result);
    } catch (error) {
      setError("Can't find Anything");
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
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          | Youngflix
        </title>
      </Helmet>
      <Backdrop
        imageUrl={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require('../assets/noPoster.png')
        }
      />
      <Content>
        <Cover
          imageUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../assets/noPoster.png')
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <FiCalendar
              size="13"
              style={{ marginRight: '6px', color: '#f1c40f' }}
              className="shadow"
            />
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <FiClock
              size="13"
              style={{ marginRight: '6px', color: '#f1c40f' }}
              className="shadow"
            />
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : 'Preparing'}
            </Item>
            {result.number_of_seasons ? (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.number_of_seasons === 1
                    ? `${result.number_of_seasons} season`
                    : `${result.number_of_seasons} seasons`}{' '}
                </Item>
              </>
            ) : null}
            <Divider>•</Divider>
            <StarRatings
              rating={result.vote_average / 2}
              starRatedColor="#f1c40f"
              starEmptyColor="rgba(255, 255, 255, 0.3)"
              starDimension="13px"
              starSpacing="2px"
            />
            <Divider>•</Divider>
            <Item>
              {result.genres.map((genre, index) =>
                index === result.genres.length - 1
                  ? genre.name
                  : `${genre.name} / `,
              )}
            </Item>
            {result.imdb_id ? (
              <>
                <Divider>•</Divider>
                <Imdb
                  href={`https://www.imdb.com/title/${result.imdb_id}/`}
                  target="_blank"
                >
                  <ImdbImage src="imdb.png" alt="imdb" />
                </Imdb>
              </>
            ) : (
              <>
                <Divider>•</Divider>
                <Imdb
                  href={`https://www.imdb.com/title/${imdbId}/`}
                  target="_blank"
                >
                  <ImdbImage src="imdb.png" alt="imdb" />
                </Imdb>
              </>
            )}
          </ItemContainer>
          <OverviewContainer>
            <Overview ref={overviewText}>
              {result.overview.substring(0, 290)}{' '}
              {result.overview.length > 290 ? '•••' : null}
            </Overview>
            {result.overview.length > 290 ? (
              <OverviewBtn onClick={() => handleClick(result.overview)}>
                {isClick ? '▶▶' : '◀◀'}
              </OverviewBtn>
            ) : null}
          </OverviewContainer>
          {result.videos.results && (
            <VideoContainer>
              {result.videos.results.map(
                (video, index) =>
                  index < 3 && (
                    <VideoLinks
                      key={video.id}
                      id={video.id}
                      link={video.key}
                      name={video.name}
                    />
                  ),
              )}
            </VideoContainer>
          )}
          <TabsContainer>
            {isMovie ? (
              <MovieTabs
                detailId={id}
                collection={result.belongs_to_collection}
              />
            ) : (
              <ShowTabs detailId={id} />
            )}
          </TabsContainer>
        </Data>
      </Content>
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

export default Detail;
