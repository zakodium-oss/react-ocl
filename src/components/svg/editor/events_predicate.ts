const cleanKeysSupported = new Set(['Backspace', 'Delete']);

/**
 * Check if the event is a clean event.
 * @param event - The event to check.
 * @returns true if the event is a clean event, false otherwise.
 */
export function isCleanEvent(event: KeyboardEvent) {
  return cleanKeysSupported.has(event.key);
}

/**
 * Check if the event is a quick numbering event.
 * @param event - The event to check.
 * @returns true if the event is a quick numbering event, false otherwise.
 */
export function isQuickNumberingEvent(event: KeyboardEvent) {
  const isKeyQuote =
    // Normalized to handle different quote characters on different keyboards.
    event.key.normalize() === "'" ||
    // Fallback on keyCode 222 and 52 which is known to be a quote. Even if it is a dead key
    event.keyCode === 222 ||
    event.keyCode === 52 ||
    // Fallback for exotic keyboard without quote accessible directly through one keydown,
    // but is related to the physical position of a quote for a QWERTY US keyboard.
    event.code === 'Quote';
  // Prefer code Space over key `' '`, as it may have unexpected behavior on asiatic keyboards.
  const isSpaceKey = event.code === 'Space';

  return isKeyQuote || isSpaceKey;
}
