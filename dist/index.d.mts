/**
 * Optimized fart scrolling using requestAnimationFrame and debouncing.
 * @param {number} threshold - The scroll distance threshold to trigger a fart sound.
 * @returns {Function} - A function to stop the fart scrolling.
 */
declare const startFartScroll: (threshold?: number) => (() => void);

export { startFartScroll as default };
