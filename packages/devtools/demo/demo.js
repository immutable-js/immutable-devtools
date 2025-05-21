import * as Immutable from 'immutable';
import installDevTools from '../dist/index.js';

var MyRecord = Immutable.Record(
  {
    value: 'original',
    value2: 'original2',
    a: 'A',
    b: Immutable.List([1, 2, , null, 5]),
    c: Immutable.Map({ key1: { item1: null } }).set({ obj: 'ref' }, 'value'),
    set: Immutable.Set(['Beer', 'Water']),
    stack: Immutable.Stack(['item0', 'item1']),
  },
  'MyRecord'
);
console.log("It's hard without Immutable DevTools:", MyRecord());

// Do not forget to install devtools!
installDevTools(Immutable);
console.log('Happy Immutable coding with installDevTools!');

console.log(
  'Record',
  MyRecord(),
  'altered keys are bold in detail and previewed',
  MyRecord({ value: 'altered', b: 'record', c: 'preview' })
);

var deep = Immutable.fromJS({
  Hello: { very: { deep: ['immutable', 'world'] } },
});
console.log('Deep:', deep);

var orderedMap = Immutable.OrderedMap({
  This: 'should',
  persist: 'order',
});
var orderedMap2 = orderedMap
  .set('of', 'nonsense')
  .set('by', 'first')
  .set('assignment', 'time')
  .set('of', 'keys')
  .set('This', 'must');

console.log('OrderedMap', orderedMap, orderedMap2);

var mapWithObjectKey = orderedMap
  .set(deep, 'This value has immutable key')
  .set(
    { 'plain object keys': 'are possible' },
    { 'object to object': 'mapping is possible' }
  )
  .set(
    { 'plain object keys': 'are possible' },
    { structure: 'mapping is complicated without Immutable' }
  );
console.log('Map with object keys:', mapWithObjectKey.toMap());

console.log("Set.of('Alice', 'Bob')", Immutable.Set.of('Alice', 'Bob'));
console.log(
  "OrderedSet.of('Alice', 'Bob')",
  Immutable.OrderedSet.of('Alice', 'Bob')
);

var stack = Immutable.Stack()
  .push('Stack item 1')
  .push(MyRecord())
  .push(orderedMap)
  .push('Last Item');
console.log('Stack', stack);

var nestedRecords = MyRecord({
  value: MyRecord({
    value: MyRecord(),
  }),
  a: MyRecord(),
});
console.log('Nested Records', nestedRecords);

console.log(
  'Null string',
  Immutable.List.of('hello', 'null', null, 'undefined', undefined)
);

console.log('Range', Immutable.Range(0, 10, 2));
