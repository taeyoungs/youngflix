import React, { useState, useEffect } from 'react';
import { movieApi } from 'api';
import Loader from 'Components/Loader';

const HomeComponent = React.lazy(() =>
  import('Components/PageContents/HomeContent.js'),
);

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    popular: null,
    upcoming: null,
  });
  const [error, setError] = useState('');

  const getResult = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      setResult({
        nowPlaying,
        popular,
        upcoming,
      });
    } catch (error) {
      setError("Can't find anything");
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <React.Suspense fallback={<Loader />}>
      <HomeComponent result={result} error={error} />
    </React.Suspense>
  );
};

export default Home;
