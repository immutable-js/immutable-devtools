import installDevTools from '@jdeniau/immutable-devtools';
import * as Immutable from 'immutable';

if (window.__ImmutableJSDevToolsFormattersInstalled !== true) {
  installDevTools(Immutable);
  window.__ImmutableJSDevToolsFormattersInstalled = true;
}
