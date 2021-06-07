/**
 * Copied and adapted from @stencil/sass
 * https://github.com/ionic-team/stencil-sass
 */

export function usePlugin(fileName: string) {
  return /\.svg$/i.test(fileName);
}

/**
 *  If the sourceText is a base64 string returned by
 *  rollup imagePlugin, remove the export part of the
 *  string and decode the base64 value
 *
 *  @param sourceText - a rollup imagePlugin export string in the format const img = 'data:image/svg+xml;base64,...'; export default img;
 */
export function decodeBase64SourceText(sourceText: string) {
  let [, base64Code] = sourceText.split('base64,');
  if (!base64Code) {
    return false;
  }

  base64Code = base64Code.slice(0, base64Code.indexOf(`';`));

  return Buffer.from(base64Code, 'base64').toString();
}
