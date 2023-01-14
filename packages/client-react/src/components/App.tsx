import { Suspense } from 'react';
import routes from '~react-pages';
import { useRoutes } from 'react-router-dom';
import { Layout } from './Layout/Layout';

export const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>{useRoutes(routes)}</Layout>
    </Suspense>
  );
};
