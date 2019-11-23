import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DetailPresenter = ({ result, loading, error }) => null;

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
