/* eslint-disable jsdoc/require-param,jsdoc/require-returns */
import type {
  UseCanvasEditorMoleculeOptions,
  UseCanvasEditorReactionOptions,
} from './canvas_editor_hook.js';
import { useCanvasEditor } from './canvas_editor_hook.js';

export interface CanvasEditorBaseProps {
  /**
   * Width of the root div element.
   * @default '100%'
   */
  width?: number | string;

  /**
   * Height of the root div element.
   * @default '100%'
   */
  height?: number | string;
}

export type CanvasMoleculeEditorProps = Omit<
  UseCanvasEditorMoleculeOptions,
  'initialMode'
> &
  CanvasEditorBaseProps;

/**
 * Render a canvas editor in molecule mode.
 */
export function CanvasMoleculeEditor(props: CanvasMoleculeEditorProps) {
  const { width = '100%', height = '100%', ...otherProps } = props;

  const { elementRef } = useCanvasEditor({
    initialMode: 'molecule',
    ...otherProps,
  });

  return <div ref={elementRef} style={{ width, height }} />;
}

export type CanvasReactionEditorProps = Omit<
  UseCanvasEditorReactionOptions,
  'initialMode'
> &
  CanvasEditorBaseProps;

/**
 * Render a canvas editor in reaction mode.
 */
export function CanvasReactionEditor(props: CanvasReactionEditorProps) {
  const { width = '100%', height = '100%', ...otherProps } = props;

  const { elementRef } = useCanvasEditor({
    initialMode: 'reaction',
    ...otherProps,
  });

  return <div ref={elementRef} style={{ width, height }} />;
}
