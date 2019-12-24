import React, { useState, useEffect } from 'react';
import Loader from 'Components/Loader';
import { tvApi } from 'api';

const TVComponent = React.lazy(() =>
  import('Components/PageContents/TVContent'),
);

const TV = () => {
  const [result, setResult] = useState({
    topRated: null,
    airingToday: null,
    popular: null,
  });
  const [error, setError] = useState('');

  const getResult = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      setResult({
        topRated,
        airingToday,
        popular,
      });
    } catch {
      setError("Can't find anything");
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <React.Suspense fallback={<Loader />}>
      <TVComponent result={result} error={error} />
    </React.Suspense>
  );
};

export default TV;
