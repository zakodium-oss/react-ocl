export interface InlineStylesheetProps {
  children: string;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function InlineStylesheet(props: InlineStylesheetProps) {
  const { children } = props;

  return (
    // https://react.dev/reference/react-dom/components/style#special-rendering-behavior
    <style precedence="medium" href={children}>
      {children}
    </style>
  );
}
