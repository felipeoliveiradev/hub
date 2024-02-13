import { ValueObject } from '../valueObject';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly prop1: string,
    readonly prop2: object,
    readonly value: number,
  ) {
    super();
  }
}

describe('Value Object Unit Tests', () => {
  describe('Simple value object', () => {
    test('Should be equal', () => {
      const value1: StringValueObject = new StringValueObject('test');
      const value2: StringValueObject = new StringValueObject('test');
      expect(value1.equals(value2)).toBeTruthy();
    });

    test('Should not be equal', () => {
      const value1: StringValueObject = new StringValueObject('test');
      const value2: StringValueObject = new StringValueObject('test2');
      expect(value1.equals(value2)).toBeFalsy();
    });
  });

  describe('Complex value object', () => {
    test('Should be equal', () => {
      const value1: ComplexValueObject = new ComplexValueObject(
        'test',
        { a: 1 },
        1,
      );
      const value2: ComplexValueObject = new ComplexValueObject(
        'test',
        { a: 1 },
        1,
      );
      expect(value1.equals(value2)).toBeTruthy();
    });
    test('Should not be equal', () => {
      const value1: ComplexValueObject = new ComplexValueObject(
        'test',
        { a: 1 },
        1,
      );
      const value2: ComplexValueObject = new ComplexValueObject(
        'test',
        { a: 2 },
        1,
      );
      expect(value1.equals(value2)).toBeFalsy();
    });
  });
});
