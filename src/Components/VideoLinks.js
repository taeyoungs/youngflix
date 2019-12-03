import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Youtube } from 'styled-icons/fa-brands/Youtube';

const Container = styled('div')`
  :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const VideoLink = styled('a')`
  display: flex;
  align-items: center;
  font-size: 16px;
  &:hover {
    opacity: 0.5;
  }
`;

const VideoIcon = styled(Youtube)`
  width: 30px;
  color: rgba(255, 255, 255, 0.4);
  margin-right: 10px;
`;

const VideoLinks = ({ id, link, name }) => {
  return (
    <Container>
      <VideoLink
        href={`https://www.youtube.com/watch?v=${link}`}
        target="_blank"
      >
        <VideoIcon /> {name}
      </VideoLink>
    </Container>
  );
};

VideoLinks.propTypes = {
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default VideoLinks;
