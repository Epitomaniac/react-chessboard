import type { Preview } from '@storybook/react-vite';

if (typeof window !== 'undefined' && window.parent !== window) {
  const parentWindow = window.parent as Window & typeof globalThis;

  (['log', 'warn', 'error', 'info', 'debug'] as const).forEach((level) => {
    const original = console[level];
    console[level] = ((...args: unknown[]) => {
      try {
        parentWindow.console[level](...args);
      } catch {
        // Ignore cross-origin issues
      }
      original(...args);
    }) as (typeof console)[typeof level];
  });
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
