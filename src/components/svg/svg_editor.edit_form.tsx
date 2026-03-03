import { offset, shift, useFloating } from '@floating-ui/react-dom';
import type { MouseEvent, SubmitEvent } from 'react';
import { useRef } from 'react';

import {
  AtomLabelEditButtonStyled,
  AtomLabelEditDialogStyled,
  AtomLabelEditFormStyled,
  AtomLabelEditInputStyled,
  greekLetters,
  primes,
} from './svg_editor.styled.ts';

interface AtomLabelEditFormProps {
  defaultValue: string;
  atomCoords: { x: number; y: number };
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export function AtomLabelEditForm(props: AtomLabelEditFormProps) {
  const { defaultValue, atomCoords, onSubmit, onCancel } = props;
  const floating = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    transform: false,
    middleware: [
      offset({ crossAxis: 5 }),
      shift({
        crossAxis: true,
        altBoundary: true,
      }),
    ],
  });
  const formRef = useRef<HTMLFormElement>(null);

  function onFormSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('label') as string;
    onSubmit(value);
  }

  function onCancelClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onCancel();
  }

  function onShortcut(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!formRef.current) return;
    const form = formRef.current;
    const input = form.querySelector('input[type="text"]') as HTMLInputElement;
    if (!input) return;

    const value = event.currentTarget.textContent.trim();
    input.setRangeText(
      value,
      input.selectionStart ?? 0,
      input.selectionEnd ?? input.value.length,
      'end',
    );
    input.focus();
  }

  function handleDialogLightDismiss(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== floating.refs.floating.current) return;

    // The dialog has no padding, if it is the target of the click,
    // it means we click on the backdrop.
    onCancel();
  }

  function onDialogRef(node: HTMLDialogElement | null) {
    node?.showModal();
    floating.refs.setFloating(node);
  }

  return (
    <>
      {/* dom node for floating ui to hook on */}
      <span
        ref={floating.refs.setReference}
        style={{
          position: 'absolute',
          top: atomCoords.y,
          left: atomCoords.x,
        }}
      />

      {/* The floating dialog (open at mount with `.showModal()`) */}
      <AtomLabelEditDialogStyled
        ref={onDialogRef}
        // eslint-disable-next-line react-hooks/refs
        style={floating.floatingStyles}
        closedby="any" // supports dismiss with `Escape` key
        onClose={onCancel}
        onClick={handleDialogLightDismiss}
      >
        <AtomLabelEditFormStyled
          ref={formRef}
          onSubmit={onFormSubmit}
          method="dialog"
        >
          <AtomLabelEditInputStyled
            type="text"
            name="label"
            defaultValue={defaultValue}
            size={5}
            autoFocus
            ref={autoSelectText}
          />
          <AtomLabelEditButtonStyled
            area="submit"
            type="submit"
            aria-label="Submit"
          >
            ✔️
          </AtomLabelEditButtonStyled>
          <AtomLabelEditButtonStyled
            area="cancel"
            type="button"
            aria-label="Cancel"
            onClick={onCancelClick}
          >
            ❌
          </AtomLabelEditButtonStyled>

          {Object.entries(greekLetters).map(([charName, greekChar]) => (
            <AtomLabelEditButtonStyled
              key={charName}
              area={charName}
              type="button"
              onClick={onShortcut}
            >
              {greekChar}
            </AtomLabelEditButtonStyled>
          ))}

          {Object.entries(primes).map(([primeName, primeChar]) => (
            <AtomLabelEditButtonStyled
              key={primeName}
              area={primeName}
              type="button"
              onClick={onShortcut}
            >
              {primeChar}
            </AtomLabelEditButtonStyled>
          ))}
        </AtomLabelEditFormStyled>
      </AtomLabelEditDialogStyled>
    </>
  );
}

function autoSelectText(node: HTMLInputElement | null) {
  node?.select();
}
