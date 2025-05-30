const orange = 'light-dark(rgb(232,98,0), rgb(255, 150, 50))';
const purple = 'light-dark( #881391, #D48CE6)';
const gray = 'light-dark(rgb(119,119,119), rgb(201, 201, 201))';

const listStyle = {
  style:
    'list-style-type: none; padding: 0; margin: 0 0 0 12px; font-style: normal; position: relative',
};
const immutableNameStyle = {
  style: `color: ${orange}; position: relative`,
};
const keyStyle = { style: `color: ${purple}` };
const defaultValueKeyStyle = { style: `color: ${gray}` };
const alteredValueKeyStyle = { style: `color: ${purple}; font-weight: bolder` };
const inlineValuesStyle = {
  style: `color: ${gray}; font-style: italic; position: relative`,
};
const nullStyle = { style: `color: ${gray}` };

export type DevToolsFormatter = {
  header: (object: any, config?: any) => any;
  hasBody: (object: any, config?: any) => boolean;
  body?: (object: any) => any;
};

export type ImmutableDevtoolsFormatters = {
  RecordFormatter: DevToolsFormatter;
  OrderedMapFormatter: DevToolsFormatter;
  OrderedSetFormatter: DevToolsFormatter;
  ListFormatter: DevToolsFormatter;
  MapFormatter: DevToolsFormatter;
  SetFormatter: DevToolsFormatter;
  StackFormatter: DevToolsFormatter;
  RangeFormatter: DevToolsFormatter;
};

export default function createFormatters(
  Immutable: any
): ImmutableDevtoolsFormatters {
  const isRecord = (maybeRecord: any) => {
    if (
      maybeRecord &&
      maybeRecord._values === undefined && // in v3 record
      maybeRecord._map === undefined // in v4 record
    ) {
      // don't detect Immutable.Record.prototype as a Record instance
      return;
    }
    // Immutable v4
    if (maybeRecord['@@__IMMUTABLE_RECORD__@@']) {
      // There's also a Immutable.Record.isRecord we could use, but then the
      // Immutable instance passed into createFormatter has to be the same
      // version as the one used to create the Immutable object.
      // That's especially a problem for the Chrome extension.
      return true;
    }
    // Immutable v3
    return !!(
      maybeRecord['@@__IMMUTABLE_KEYED__@@'] &&
      maybeRecord['@@__IMMUTABLE_ITERABLE__@@'] &&
      maybeRecord._defaultValues !== undefined
    );
  };

  const reference = (object: any, config?: any) => {
    if (typeof object === 'undefined') return ['span', nullStyle, 'undefined'];
    else if (object === null) return ['span', nullStyle, 'null'];
    return ['object', { object, config }];
  };

  const renderIterableHeader = (iterable: any, name = 'Iterable') => [
    'span',
    ['span', immutableNameStyle, name],
    ['span', `[${iterable.size}]`],
  ];

  const getKeySeq = (collection: any) =>
    collection
      .toSeq()
      .map((v: any, k: any) => k)
      .toIndexedSeq();

  const hasBody = (collection: any, config?: any) =>
    getKeySeq(collection).size > 0 && !(config && config.noPreview);

  const renderIterableBody = (
    collection: any,
    mapper: any,
    options: any = {}
  ) => {
    if (options.sorted) {
      collection = collection.sortBy((value: any, key: any) => key);
    }
    const children = collection.map(mapper).toList();
    const jsList: any[] = [];
    children.forEach((child: any) => jsList.push(child));
    return ['ol', listStyle, ...children];
  };

  const RecordFormatter: DevToolsFormatter = {
    header(record: any, config?: any) {
      if (!isRecord(record)) return null;

      const defaults = record.clear();
      const changed = !Immutable.is(defaults, record);

      if (config && config.noPreview)
        return [
          'span',
          changed ? immutableNameStyle : nullStyle,
          record._name || record.constructor.name || 'Record',
        ];

      let inlinePreview;
      if (!changed) {
        inlinePreview = ['span', inlineValuesStyle, '{}'];
      } else {
        const preview = getKeySeq(record).reduce((preview: any, key: any) => {
          if (Immutable.is(defaults.get(key), record.get(key))) return preview;
          if (preview.length) preview.push(', ');

          preview.push([
            'span',
            {},
            ['span', keyStyle, key + ': '],
            reference(record.get(key), { noPreview: true }),
          ]);
          return preview;
        }, []);
        inlinePreview = ['span', inlineValuesStyle, '{', ...preview, '}'];
      }
      return [
        'span',
        {},
        [
          'span',
          immutableNameStyle,
          record._name || record.constructor.name || 'Record',
        ],
        ' ',
        inlinePreview,
      ];
    },
    hasBody,
    body(record: any) {
      const defaults = record.clear();
      const children = getKeySeq(record)
        .toJS()
        .map((key: any) => {
          const style = Immutable.is(defaults.get(key), record.get(key))
            ? defaultValueKeyStyle
            : alteredValueKeyStyle;
          return [
            'li',
            {},
            ['span', style, key + ': '],
            reference(record.get(key)),
          ];
        });
      return ['ol', listStyle, ...children];
    },
  };

  const ListFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isList(o)) return null;
      return renderIterableHeader(o, 'List');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(o, (value: any, key: any) => [
        'li',
        ['span', keyStyle, key + ': '],
        reference(value),
      ]);
    },
  };

  const StackFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isStack(o)) return null;
      return renderIterableHeader(o, 'Stack');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(o, (value: any, key: any) => [
        'li',
        ['span', keyStyle, key + ': '],
        reference(value),
      ]);
    },
  };

  const MapFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isMap(o)) return null;
      return renderIterableHeader(o, 'Map');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(
        o,
        (value: any, key: any) => [
          'li',
          {},
          '{',
          reference(key),
          ' => ',
          reference(value),
          '}',
        ],
        { sorted: true }
      );
    },
  };

  const OrderedMapFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isOrderedMap(o)) return null;
      return renderIterableHeader(o, 'OrderedMap');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(o, (value: any, key: any) => [
        'li',
        {},
        '{',
        reference(key),
        ' => ',
        reference(value),
        '}',
      ]);
    },
  };

  const SetFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isSet(o)) return null;
      return renderIterableHeader(o, 'Set');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(o, (value: any) => ['li', reference(value)], {
        sorted: true,
      });
    },
  };

  const OrderedSetFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isOrderedSet(o)) return null;
      return renderIterableHeader(o, 'OrderedSet');
    },
    hasBody,
    body(o: any) {
      return renderIterableBody(o, (value: any) => ['li', reference(value)]);
    },
  };

  const RangeFormatter: DevToolsFormatter = {
    header(o: any) {
      if (!Immutable.isSeq(o)) return null;
      if (
        typeof o._start === 'undefined' ||
        typeof o._end === 'undefined' ||
        typeof o._step === 'undefined' ||
        typeof o.toString !== 'function'
      ) {
        return null;
      }

      const out = o.toString().replace(/^Range /, '');

      return ['span', ['span', immutableNameStyle, 'Range'], ['span', out]];
    },
    hasBody: () => false,
  };

  return {
    RecordFormatter,
    OrderedMapFormatter,
    OrderedSetFormatter,
    ListFormatter,
    MapFormatter,
    SetFormatter,
    StackFormatter,
    RangeFormatter,
  };
}
