import installDevTools from '@jdeniau/immutable-devtools';
import * as Immutable from 'immutable';

// The code can be loaded and unloaded several times on the same page,
// so we can't rely on variables inside the modules to detect if the formatters
// have already been injected into the page.
// Instead let's set a `window.__ImmutableJSDevToolsFormattersInstalled` property.
if (window.__ImmutableJSDevToolsFormattersInstalled !== true) {
  installDevTools(Immutable);
  window.__ImmutableJSDevToolsFormattersInstalled = true;
}
