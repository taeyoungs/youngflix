import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { movieApi, tvApi } from 'api';

const Container = styled('div')`
  margin-top: 20px;
  width: 100%;
  padding: 10px 10px 0px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
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
  height: 70%;
  display: flex;
  align-items: center;
`;

const Image = styled('img')`
  width: 150px;
`;

const Name = styled('div')`
  margin-bottom: 10px;
`;

const TabCompany = props => {
  //   const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({
    loading: true,
    data: [],
  });
  const [error, setError] = useState();

  const {
    location: { pathname },
    history: { push },
    match: {
      params: { id },
    },
  } = props;

  const [isMovie, setIsMovie] = useState(pathname.includes('/movie/'));

  const getDetail = async () => {
    // console.log(id);
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
      {detail.data.production_companies &&
        detail.data.production_companies.length > 0 &&
        detail.data.production_companies.map(comp => (
          <Company key={comp.id}>
            <ImageContainer>
              <Image
                src={
                  comp.logo_path
                    ? `https://image.tmdb.org/t/p/original${comp.logo_path}`
                    : 'noPoster.png'
                }
              />
            </ImageContainer>
            <Name>{comp.name}</Name>
          </Company>
        ))}
    </Container>
  );
};

export default TabCompany;
