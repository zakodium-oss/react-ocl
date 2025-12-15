import { useId, useInsertionEffect, useRef } from 'react';

/**
 * Little util to inject CSS into the head.
 * @param css - The CSS to inject.
 * @param prefixId - An optional prefix to add to the id of the style element.
 */
export function useCSS(css: string, prefixId?: string) {
  // const $styleRef = useRef<HTMLStyleElement>(undefined);
  // const id = useId();
  // const finalId = prefixId ? `${prefixId}-${id}` : id;

  useInsertionEffect(() => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);

    document.adoptedStyleSheets.push(sheet);
    return () => {
      const index = document.adoptedStyleSheets.indexOf(sheet);
      if (index === -1) return;
      document.adoptedStyleSheets.splice(index, 1);
    };

    // const $style = document.createElement('style');
    // $style.innerHTML = css;
    // $style.id = finalId;
    //
    // document.head.append($style);
    // $styleRef.current = $style;
    //
    // return () => $style.remove();
  }, [css]);
}
