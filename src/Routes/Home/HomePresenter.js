import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HomePresenter = ({ nowPlaying, upcoming, popular, loading, error }) =>
  null;

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
