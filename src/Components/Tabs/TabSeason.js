import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tvApi } from 'api';

const Container = styled('div')`
  margin-top: 20px;
  width: 100%;
  padding: 10px 10px 0px 10px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 1fr);
  overflow-x: scroll;
`;

const Company = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageContainer = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Image = styled('img')`
  width: 120px;
  margin-bottom: 5px;
`;

const Name = styled('div')`
  margin-bottom: 5px;
`;

const Year = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

const TabCompany = props => {
  const [detail, setDetail] = useState({
    loading: true,
    data: [],
  });
  const [error, setError] = useState();

  const {
    history: { push },
    match: {
      params: { id },
    },
  } = props;

  const getDetail = async () => {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    try {
      ({ data: result } = await tvApi.tvDetail(parsedId));
      //   console.log(result);
    } catch {
      setError("Can't find anything");
    } finally {
      setDetail({
        loading: false,
        data: result,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return detail.loading ? (
    'Loading ...'
  ) : (
    <Container>
      {detail.data.seasons &&
        detail.data.seasons.length > 0 &&
        detail.data.seasons.map(season => (
          <Company key={season.id}>
            <ImageContainer>
              <Image
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                    : 'noPoster.png'
                }
              />
            </ImageContainer>
            <Name>{season.name}</Name>
            <Year>{season.air_date}</Year>
          </Company>
        ))}
    </Container>
  );
};

export default TabCompany;
