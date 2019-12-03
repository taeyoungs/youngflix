import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TabCompany from 'Components/Tabs/TabCompany';
import TabCountry from 'Components/Tabs/TabCountry';

const Container = styled('div')`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Tab = styled('span')`
  display: inline-block;
  padding: 10px 0px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid
    ${props => (props.active ? '#f1c40f' : 'transparent')};
  &:hover {
    color: #f1c40f;
  }
`;

const MovieTabs = ({ detailId, location }) => {
  return (
    <>
      <Container>
        <Tab active={location.pathname === `/movie/${detailId}/company`}>
          <Link to={`/movie/${detailId}/company`}>Production Company</Link>
        </Tab>
        <Tab active={location.pathname === `/movie/${detailId}/country`}>
          <Link to={`/movie/${detailId}/country`}>Production Country</Link>
        </Tab>
        <Tab active={location.pathname === `/movie/${detailId}/collection`}>
          <Link to={`/movie/${detailId}/collection`}>Collection</Link>
        </Tab>
      </Container>
      <Route path="/movie/:id/company" component={TabCompany} />
      <Route path="/movie/:id/country" component={TabCountry} />
    </>
  );
};

export default withRouter(MovieTabs);
