import { DefaultErrorRenderer } from '../error_renderer.js';

export function DefaultMolfileErrorComponent(props: {
  width: number;
  height: number;
}) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid Molfile"
    />
  );
}
