import { resetCss } from './ocl_reset_css.ts';

// eslint-disable-next-line jsdoc/require-jsdoc
export function OclReset() {
  return (
    <style href="react-ocl#Reset" precedence="medium">
      {resetCss}
    </style>
  );
}
