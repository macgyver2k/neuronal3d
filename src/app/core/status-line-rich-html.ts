/** Escaped plain text with numeric tokens wrapped for DaisyUI badges (wie früher in neuronal-app). */
export function neuronalStatusPlainToRichHtml(plain: string): string {
  const esc = plain
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc.replace(
    /(\d+:\d+:\d+|\d+:\d+|(?:-)?\b\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?%?)/g,
    '<span class="badge badge-primary badge-sm mx-0.5 font-semibold tabular-nums">$1</span>',
  );
}
