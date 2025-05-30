// TypeScript entry point for devtools package
import createFormatters, {
  DevToolsFormatter,
  ImmutableDevtoolsFormatters,
} from './createFormatters.ts';

// Check for globally defined Immutable and add an install method to it.
declare const Immutable: any;

if (typeof Immutable !== 'undefined') {
  (Immutable as any).installDevTools = install.bind(null, Immutable);
}

let installed = false;
function install(Immutable: any) {
  const gw = typeof window === 'undefined' ? (global as any) : (window as any);

  // Don't install more than once.
  if (installed === true) {
    return;
  }

  gw.devtoolsFormatters = gw.devtoolsFormatters || [];

  const {
    RecordFormatter,
    OrderedMapFormatter,
    OrderedSetFormatter,
    ListFormatter,
    MapFormatter,
    SetFormatter,
    StackFormatter,
    RangeFormatter,
  } = createFormatters(Immutable);

  gw.devtoolsFormatters.push(
    RecordFormatter,
    OrderedMapFormatter,
    OrderedSetFormatter,
    ListFormatter,
    MapFormatter,
    SetFormatter,
    StackFormatter,
    RangeFormatter
  );

  installed = true;
}

export default install;

export type { DevToolsFormatter, ImmutableDevtoolsFormatters };
