import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TabCompany from 'Components/Tabs/TabCompany';
import TabCreatedBy from 'Components/Tabs/TabCreatedBy';

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

const ShowTabs = ({
  production_companies,
  seasons,
  created_by,
  detailId,
  location,
}) => {
  return (
    <>
      {console.log(location)}
      <Container>
        <Tab active={location.pathname === `/show/${detailId}/company`}>
          <Link to={`/show/${detailId}/company`}>Production Company</Link>
        </Tab>
        <Tab active={location.pathname === `/show/${detailId}/createdBy`}>
          <Link to={`/show/${detailId}/createdBy`}>Created By</Link>
        </Tab>
        <Tab active={location.pathname === `/show/${detailId}/season`}>
          <Link to={`/show/${detailId}/season`}>Seasons</Link>
        </Tab>
      </Container>
      <Route path="/show/:id/company" component={TabCompany} />
      <Route path="/show/:id/createdBy" component={TabCreatedBy} />
    </>
  );
};

ShowTabs.propTypes = {
  created_by: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    }),
  ),
  production_companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo_path: PropTypes.string,
    }),
  ),
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      air_date: PropTypes.string.isRequired,
      episode_count: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
};

export default withRouter(ShowTabs);
