import { InlineStylesheet } from '../../src/styling/inline_stylesheet.tsx';

import { resetCss } from './ocl_reset_css.ts';

// eslint-disable-next-line jsdoc/require-jsdoc
export function OclReset() {
  return <InlineStylesheet id="Reset">{resetCss}</InlineStylesheet>;
}
