const {uniqueChars, getMaxSum} = require('../controllers')

describe('uniqueChars', () => {
    it('should return an empty string when the input is an empty string', () => {
      expect(uniqueChars('')).toEqual('');
    });

    it('should return an empty string when the input contains only whitespaces', () => {
      expect(uniqueChars('  \t   ')).toEqual('');
    });

    it('should return the input string when all characters are unique', () => {
      expect(uniqueChars('abcdefg')).toEqual('abcdefg');
    });

    it('should return a new string containing only the unique characters in the input string', () => {
      expect(uniqueChars('hello world')).toEqual('helo wrd');
      expect(uniqueChars('foo bar baz')).toEqual('fo barz');
      expect(uniqueChars('javascript')).toEqual('javscript');
    });

    it('should preserve the order of the unique characters as they first appear', () => {
      expect(uniqueChars('abca')).toEqual('abc');
      expect(uniqueChars('abbac')).toEqual('abc');
      expect(uniqueChars('abcabc')).toEqual('abc');
    });
});

describe('getMaxSum', () => {
    test('should return the maximum sum of any contiguous subarray of the given array', () => {
      expect(getMaxSum([1, -2, 3, 4, -5, 8])).toBe(10);
      expect(getMaxSum([-1, 2, 3, -4, 5, 10])).toBe(16);
      expect(getMaxSum([1, 2, 3, 4, 5])).toBe(15);
      expect(getMaxSum([-1, -2, -3, -4, -5])).toBe(0);
      expect(getMaxSum([5])).toBe(5);
    });

    test('should return 0 if the array is empty or contains only negative integers', () => {
      expect(getMaxSum([])).toBe(0);
      expect(getMaxSum([-1, -2, -3])).toBe(0);
    });
});