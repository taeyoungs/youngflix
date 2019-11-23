import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TVPresenter = ({ topRated, airingToday, popular, loading, error }) =>
  null;

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
