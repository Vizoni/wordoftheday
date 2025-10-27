import React, { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

const HomeLazy = React.lazy(() =>
  import('ui/pages/Home/Home').then(({ Home }) => ({ default: Home }))
);
const ListLazy = React.lazy(() =>
  import('ui/pages/List/List').then(({ List }) => ({ default: List }))
);

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    return <div>Erro ao carregar a página!</div>;
  }
}

export function RootRoute() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<HomeLazy />} />
            <Route path='/list' element={<ListLazy />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
