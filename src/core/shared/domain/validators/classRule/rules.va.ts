import { isEmpty } from 'lodash';

export interface ValidatorRulesItem {
  property: string;
  method: string;
  error?: Error;
}
export class ValidatorRules {
  protected list: Array<ValidatorRulesItem> = [];
  private constructor(
    private value: any,
    private property: string,
  ) {}
  static value(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property);
  }
  required(): Omit<this, 'required'> {
    if (this.value === null || this.value === undefined || this.value === '') {
      this.list.push({
        property: this.property,
        method: 'required',
        error: new Error(`${this.property} is required`),
      });
    }
    return this;
  }
  string(): Omit<this, 'string'> {
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      this.list.push({
        property: this.property,
        method: 'string',
        error: new Error(`${this.property} is string`),
      });
    }
    return this;
  }

  number(): Omit<this, 'number'> {
    if (!isEmpty(this.value) && typeof this.value !== 'number') {
      this.list.push({
        property: this.property,
        method: 'number',
        error: new Error(`${this.property} is number`),
      });
    }
    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      this.list.push({
        property: this.property,
        method: 'boolean',
        error: new Error(`${this.property} is boolean`),
      });
    }
    return this;
  }

  object(): Omit<this, 'object'> {
    if (!isEmpty(this.value) && typeof this.value !== 'object') {
      this.list.push({
        property: this.property,
        method: 'object',
        error: new Error(`${this.property} is object`),
      });
    }
    return this;
  }

  array(): Omit<this, 'array'> {
    if (!isEmpty(this.value) && this.value instanceof Array === false) {
      this.list.push({
        property: this.property,
        method: 'array',
        error: new Error(`${this.property} is array`),
      });
    }
    return this;
  }

  minLength(limit: number): Omit<this, 'array'> {
    if (!isEmpty(this.value) && this.value.length < limit) {
      this.list.push({
        property: this.property,
        method: 'array',
        error: new Error(`${this.property} must be less than ${limit}`),
      });
    }
    return this;
  }
  maxLength(limit: number): Omit<this, 'array'> {
    if (!isEmpty(this.value) && this.value.length > limit) {
      this.list.push({
        property: this.property,
        method: 'maxLength',
        error: new Error(`${this.property} must be greater than ${limit}`),
      });
    }
    return this;
  }

  validate(): void {
    if (this.list.length > 0) {
      throw new Error(this.list.map((item) => item.error?.message).join(', '));
    }
  }
}
