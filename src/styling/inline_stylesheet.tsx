export interface InlineStylesheetProps {
  /**
   * Bound to `href` props of the `<style>` element with 'react-ocl#' prefix.
   * See: https://react.dev/reference/react-dom/components/style#special-rendering-behavior
   */
  id: string;
  /** @default 'medium' */
  precedence?: string;
  children: string;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function InlineStylesheet(props: InlineStylesheetProps) {
  const { id, precedence = 'medium', children } = props;

  const href = `react-ocl#${id}`;

  return (
    <style precedence={precedence} href={href}>
      {children}
    </style>
  );
}
