import installDevTools from '@immutable/devtools';
import * as Immutable from 'immutable';

// This runs in the page's own realm (content script `world: "MAIN"`), because
// DevTools reads `window.devtoolsFormatters` from there. Everything else stays
// inside this bundle: no DOM node is added and no other global is created.
//
// The code can be loaded several times on the same page (e.g. the extension
// being reloaded), so we can't rely on variables inside the modules to detect
// if the formatters have already been injected into the page.
// Instead let's flag it on `window`, as a non-enumerable property so that page
// code walking over `window` doesn't see it.
const FLAG = '__ImmutableJSDevToolsFormattersInstalled';

if (window[FLAG] !== true) {
  installDevTools(Immutable);

  Object.defineProperty(window, FLAG, {
    value: true,
    enumerable: false,
    writable: true,
    configurable: true,
  });
}
