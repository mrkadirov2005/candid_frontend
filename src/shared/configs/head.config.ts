import { createHead } from '@unhead/react/client';

export const headConfig = createHead({
  init: [
    {
      titleTemplate: '%s | VN LMS',
    },
  ],
});
