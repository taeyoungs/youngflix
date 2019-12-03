import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FiClock, FiCalendar } from 'react-icons/fi';
import StarRatings from 'react-star-ratings';
import Loader from 'Components/Loader';
import VideoLinks from 'Components/VideoLinks';

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

const Overview = styled('p')`
  padding: 10px;
  width: 70%;
  font-size: 17px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

const Imdb = styled('a')`
  display: flex;
  align-items: center;
`;

const ImdbImage = styled('img')`
  cursor: pointer;
`;

const VideoContainer = styled('div')``;

const TabsContainer = styled('div')``;

const Tab = styled('span')``;

const DetailPresenter = ({ result, loading, error, isMovie }) =>
  loading ? (
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
            : require('../../assets/noPoster.png')
        }
      />
      <Content>
        <Cover
          imageUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPoster.png')
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
            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <Imdb
                  href={`https://www.imdb.com/title/${result.imdb_id}/`}
                  target="_blank"
                >
                  <ImdbImage src="imdb.png" alt="imdb" />
                </Imdb>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.videos.results && (
            <VideoContainer>
              {result.videos.results.map(video => (
                <VideoLinks
                  key={video.id}
                  id={video.id}
                  link={video.key}
                  name={video.name}
                />
              ))}
            </VideoContainer>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
