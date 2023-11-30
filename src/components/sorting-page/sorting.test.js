import { sortBubble, sortSelection } from "./utils";
import { Direction } from "../../types/direction";


describe('Сортировка выбором работает корректно', () => {
  it('Сортировка выбором по возрастанию пустого массива выдает корректный результат', () => {
    const generator = sortSelection([], Direction.Ascending);

    expect(generator.next().value).toBe(undefined);
  })


  it('Сортировка выбором по убыванию пустого массива выдает корректный результат', () => {
    const generator = sortSelection([], Direction.Descending);

    expect(generator.next().value).toBe(undefined);
  })


  it('Сортировка выбором по возрастанию массива из одного элемента выдает корректный результат', () => {
    const generator = sortSelection([1], Direction.Ascending);

    expect(generator.next().value).toStrictEqual({
      numbers: [1],
      states: ['modified']
    });
  })


  it('Сортировка выбором по убыванию массива из одного элемента выдает корректный результат', () => {
    const generator = sortSelection([1], Direction.Descending);

    expect(generator.next().value).toStrictEqual({
      numbers: [1],
      states: ['modified']
    });
  })


  it('Сортировка выбором по возрастанию массива из нескольких элементов выдает корректный результат', () => {
    const generator = sortSelection([3, 1, 5], Direction.Ascending);

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'modified']
    });
  })


  it('Сортировка выбором по убыванию массива из нескольких элементов выдает корректный результат', () => {
    const generator = sortSelection([3, 1, 5], Direction.Descending);

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'default', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 1, 3],
      states: ['modified', 'default', 'modified']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 1, 3],
      states: ['modified', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 1, 3],
      states: ['modified', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 1, 3],
      states: ['modified', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 3, 1],
      states: ['modified', 'modified', 'modified']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 3, 1],
      states: ['modified', 'modified', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 3, 1],
      states: ['modified', 'modified', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 3, 1],
      states: ['modified', 'modified', 'modified']
    });
  })
})


describe('Сортировка пузырьком работает корректно', () => {
  it('Сортировка пузырьком по возрастанию пустого массива выдает корректный результат', () => {
    const generator = sortBubble([], Direction.Ascending);

    expect(generator.next().value).toBe(undefined);
  })


  it('Сортировка пузырьком по убыванию пустого массива выдает корректный результат', () => {
    const generator = sortBubble([], Direction.Descending);

    expect(generator.next().value).toBe(undefined);
  })


  it('Сортировка пузырьком по возрастанию массива из одного элемента выдает корректный результат', () => {
    const generator = sortBubble([1], Direction.Ascending);

    expect(generator.next().value).toStrictEqual({
      numbers: [1],
      states: ['modified']
    });
  })


  it('Сортировка пузырьком по убыванию массива из одного элемента выдает корректный результат', () => {
    const generator = sortBubble([1], Direction.Descending);

    expect(generator.next().value).toStrictEqual({
      numbers: [1],
      states: ['modified']
    });
  })


  it('Сортировка пузырьком по возрастанию массива из нескольких элементов выдает корректный результат', () => {
    const generator = sortBubble([3, 1, 5], Direction.Ascending);

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['default', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['default', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['changing', 'changing', 'modified']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [1, 3, 5],
      states: ['modified', 'modified', 'modified']
    });
  })


  it('Сортировка пузырьком по убыванию массива из нескольких элементов выдает корректный результат', () => {
    const generator = sortBubble([3, 1, 5], Direction.Descending);

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['changing', 'changing', 'default']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 1, 5],
      states: ['default', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 5, 1],
      states: ['default', 'changing', 'changing']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [3, 5, 1],
      states: ['changing', 'changing', 'modified']
    });

    expect(generator.next().value).toStrictEqual({
      numbers: [5, 3, 1],
      states: ['modified', 'modified', 'modified']
    });
  })
})