/**
 * Copied and adapted from @stencil/sass
 * https://github.com/ionic-team/stencil-sass
 */

export function usePlugin(fileName: string) {
  return /\.svg$/i.test(fileName);
}
