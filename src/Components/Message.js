import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled('img')`
  margin-right: 10px;
  width: 35px;
`;

const Text = styled('span')`
  font-size: 17px;
  color: ${props => props.color};
`;

const Message = ({ text, color, notFound }) => {
  return (
    <Container>
      {notFound ? <Img src="not-found.png" alt="NotFound" /> : null}
      <Text color={color}>{text}</Text>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  notFound: PropTypes.bool,
};

export default Message;
