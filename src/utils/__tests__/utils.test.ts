import { capitalize } from '../capitalizeWords';

describe('capitalize function', () => {
  it('Should convert the first char of a word into uppercase', () => {
    const capitalized = capitalize('naruto');
    expect(capitalized).toBe('Naruto');
  });
});
