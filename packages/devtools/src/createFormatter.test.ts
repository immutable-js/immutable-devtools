import { describe, test, expect } from '@jest/globals';
import { List, isList } from 'immutable';
import createFormatters from './createFormatters';

describe('List', () => {
  test('empty List', () => {
    const list = List();

    const { ListFormatter } = createFormatters({ List, isList });

    const formatted = ListFormatter.header(list);
    expect(formatted).toEqual([
      'span',
      [
        'span',
        {
          style:
            'color: light-dark(rgb(232,98,0), rgb(255, 150, 50)); position: relative',
        },
        'List',
      ],
      ['span', '[0]'],
    ]);
    expect(ListFormatter.hasBody(list)).toBe(false);
  });

  test('List with scalar values', () => {
    const list = List([true, false, 1, 'a']);

    const { ListFormatter } = createFormatters({ List, isList });

    const formatted = ListFormatter.header(list);
    expect(formatted).toEqual([
      'span',
      [
        'span',
        {
          style:
            'color: light-dark(rgb(232,98,0), rgb(255, 150, 50)); position: relative',
        },
        'List',
      ],
      ['span', `[${list.size}]`],
    ]);
    expect(ListFormatter.hasBody(list)).toBe(true);

    expect(ListFormatter.body!(list)).toEqual([
      'ol',
      {
        style:
          'list-style-type: none; padding: 0; margin: 0 0 0 12px; font-style: normal; position: relative',
      },
      [
        'li',
        ['span', { style: 'color: light-dark( #881391, #D48CE6)' }, '0: '],
        [
          'span',
          {
            style: 'color: light-dark(rgb(28, 128, 28), rgb(50, 200, 50))',
          },
          'true',
        ],
      ],
      [
        'li',
        ['span', { style: 'color: light-dark( #881391, #D48CE6)' }, '1: '],
        [
          'span',
          {
            style: 'color: light-dark(rgb(28, 128, 28), rgb(50, 200, 50))',
          },
          'false',
        ],
      ],
      [
        'li',
        ['span', { style: 'color: light-dark( #881391, #D48CE6)' }, '2: '],
        [
          'span',
          {
            style: 'color: light-dark(rgb(28, 128, 28), rgb(50, 200, 50))',
          },
          1,
        ],
      ],
      [
        'li',
        ['span', { style: 'color: light-dark( #881391, #D48CE6)' }, '3: '],
        [
          'object',
          {
            config: undefined,
            object: 'a',
          },
        ],
      ],
    ]);
  });
});
