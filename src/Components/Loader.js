import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Container = styled.div`
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

export default () => (
  <>
    <Helmet>
      <title>Loading | Youngflix</title>
    </Helmet>
    <Container>
      <span role="img" aria-label="loading">
        ⏰
      </span>
    </Container>
  </>
);
