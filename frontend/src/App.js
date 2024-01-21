import { lazy } from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './api/client';

const Router = lazy(() => import('./router'));

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;