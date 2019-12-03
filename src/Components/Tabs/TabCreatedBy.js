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
  grid-template-columns: repeat(auto-fill, 200px);
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
`;

const Name = styled('div')`
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
      {detail.data.created_by &&
        detail.data.created_by.length > 0 &&
        detail.data.created_by.map(person => (
          <Company key={person.id}>
            <ImageContainer>
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                    : 'noPoster.png'
                }
              />
            </ImageContainer>
            <Name>{person.name}</Name>
          </Company>
        ))}
    </Container>
  );
};

export default TabCompany;
