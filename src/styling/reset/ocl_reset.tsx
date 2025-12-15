import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';

import { useCSS } from '../use_css.ts';

import { OclResetContext } from './ocl_reset_context.tsx';
import { oclResetCss } from './ocl_reset_css.ts';

export interface OclResetProps {
  children: ReactNode;
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * Enable react-ocl-reset styles.
 * @param props - The children to render
 */
export function OclReset(props: OclResetProps) {
  useLayoutEffect(() => {
    document.body.classList.add('react-ocl-reset');

    return () => {
      document.body.classList.remove('react-ocl-reset');
    };
  }, []);

  useCSS(oclResetCss);

  return (
    <OclResetContext.Provider value>{props.children}</OclResetContext.Provider>
  );
}
