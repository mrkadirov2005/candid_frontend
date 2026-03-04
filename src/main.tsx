import '#/shared/styles/root.css';
import { UnheadProvider } from '@unhead/react/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { headConfig, queryClientConfig } from '#/shared/configs';
import { router } from '#/router';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <UnheadProvider head={headConfig}>
      <QueryClientProvider client={queryClientConfig}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UnheadProvider>
  </StrictMode>,
);
