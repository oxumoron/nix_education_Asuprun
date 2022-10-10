import * as assert from 'assert';
import {Calculator} from './index.js';
import {describe} from 'mocha';

describe('calculation', function() {

  const calculator = new Calculator;

  it('calculation sum', function() {
    assert.strictEqual(calculator.calculation(0, 1, 'sum'), 1)
  });

  it('calculation minus', function() {
    assert.strictEqual(calculator.calculation(0, 1, 'minus'), -1)
  });

  it('calculation multiple', function() {
    assert.strictEqual(calculator.calculation(0, 2, 'multiple'), 0)
  });

  it('calculation division', function() {
    assert.strictEqual(calculator.calculation(50, 50, 'division'), 1)
  });

  it('calculation division', function() {
    assert.strictEqual(calculator.calculation(50, 0, 'division'), Infinity)
  });
});