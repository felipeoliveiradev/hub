import { InvalidUuidError, Uuid } from '../uuid.vo';
import { validate as uuidValidate } from 'uuid';
describe('Value Object Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('should throw error when uuid is invalid', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
  test('Should create a valid uuid', () => {
    const uuid: Uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuid.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should accept a valid uuid', () => {
    const uuid: Uuid = new Uuid('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    expect(uuid.id).toBe('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
