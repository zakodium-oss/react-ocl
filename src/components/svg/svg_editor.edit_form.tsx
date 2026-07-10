import { offset, shift, useFloating } from '@floating-ui/react-dom';
import type { MouseEvent, RefObject, SubmitEvent } from 'react';
import { useEffect, useRef } from 'react';

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
  const {
    floatingStyles,
    refs: { floating, setFloating, setReference },
  } = useFloating<HTMLSpanElement>({
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

  // The type of this ref is not configurable in useFloating.
  const floatingDialogRef = floating as RefObject<HTMLDialogElement>;
  useEffect(() => {
    // This effect has no cleanup and instead uses `dialog.open` to avoid calling
    // the `showModal` method multiple times, because calling `close` would trigger
    // the 'close' event and propagate it to the parent component which would unmount this component.
    const dialog = floatingDialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [floatingDialogRef]);

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
    if (event.target !== floating.current) return;

    // The dialog has no padding, if it is the target of the click,
    // it means we click on the backdrop.
    onCancel();
  }

  return (
    <>
      {/* dom node for floating ui to hook on */}
      <span
        ref={setReference}
        style={{
          position: 'absolute',
          top: atomCoords.y,
          left: atomCoords.x,
        }}
      />

      {/* The floating dialog (open at mount with `.showModal()`) */}
      <AtomLabelEditDialogStyled
        ref={setFloating}
        style={floatingStyles}
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
