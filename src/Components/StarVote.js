import React from 'react';
import styled from 'styled-components';
import { StarHalfIcon } from 'styled-icons/boxicons-solid/StarHalf';
import { EmptyStarIcon } from 'styled-icons/boxicons-solid/Star';
import { StarIcon } from 'styled-icons/boxicons-regular/Star';

import PropTypes from 'prop-types';

const Container = styled('span')``;

const EmptyStar = styled(EmptyStarIcon)`
  -webkit-filter: drop-shadow(1px 1px 1px #f1c40f);
  filter: drop-shadow(1px 1px 1px #f1c40f);
  color: #f1c40f;
`;

const HalfStar = styled(StarHalfIcon)`
  -webkit-filter: drop-shadow(1px 1px 1px #f1c40f);
  filter: drop-shadow(1px 1px 1px #f1c40f);
  color: #f1c40f;
`;

const Star = styled(StarIcon)`
  -webkit-filter: drop-shadow(1px 1px 1px #f1c40f);
  filter: drop-shadow(1px 1px 1px #f1c40f);
  color: #f1c40f;
`;

const StarVote = ({ vote_average }) => {
  const calcStar = vote_average => {
    const divideTwo = vote_average / 2;
    if (vote_average === 0) {
      return (
        <>
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </>
      );
    }
    // 반쪽 별 없을 때
    if (divideTwo % 1 === 0) {
    } else {
      // 반쪽 별 있을 때
    }
  };

  return <Container></Container>;
};

StarVote.propTypes = {
  vote_average: PropTypes.number.isRequired,
};

export default StarVote;
