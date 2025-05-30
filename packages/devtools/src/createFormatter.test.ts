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
});
