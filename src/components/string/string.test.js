import { getReverseString } from "./utils";


it('Разворот строки с четным количеством символов "abcd" выдает результат "dcba"', () => {
  const generator = getReverseString('abcd');

  expect(generator.next().value).toStrictEqual({
    letters: ['a', 'b', 'c', 'd'],
    states: ["changing", "default", "default", "changing"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['d', 'b', 'c', 'a'],
    states: ["modified", "default", "default", "modified"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['d', 'b', 'c', 'a'],
    states: ["modified", "changing", "changing", "modified"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['d', 'c', 'b', 'a'],
    states: ["modified", "modified", "modified", "modified"]
  });
})


it('Разворот строки с нечетным количеством символов "abc" выдает результат "cba"', () => {
  const generator = getReverseString('abc');

  expect(generator.next().value).toStrictEqual({
    letters: ['a', 'b', 'c'],
    states: ["changing", "default", "changing"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['c', 'b', 'a'],
    states: ["modified", "default", "modified"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['c', 'b', 'a'],
    states: ["modified", "changing", "modified"]
  });

  expect(generator.next().value).toStrictEqual({
    letters: ['c', 'b', 'a'],
    states: ["modified", "modified", "modified"]
  });
})


it('Разворот строки с одним символом "a" выдает результат "a"', () => {
  const generator = getReverseString('a');

  expect(generator.next().value).toStrictEqual({
    letters: ['a'],
    states: ["modified"]
  });
})


it('Разворот пустой строки выдает результат ""', () => {
  const generator = getReverseString('');

  expect(generator.next().value).toBe(undefined);
})