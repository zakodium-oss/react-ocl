import { useInsertionEffect } from 'react';

/**
 * Little util to inject CSS into the head.
 * @param css - The CSS to inject.
 */
export function useCSS(css: string) {
  useInsertionEffect(() => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);

    document.adoptedStyleSheets.push(sheet);

    return () => {
      const index = document.adoptedStyleSheets.indexOf(sheet);
      if (index === -1) return;

      document.adoptedStyleSheets.splice(index, 1);
    };
  }, [css]);
}
