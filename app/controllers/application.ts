import Ember from 'ember';
const {
  computed
} = Ember;

export function cpDecorator(...properties: string[]) {
  return (target: Ember.Object, key: any, descriptor: any) => {
    const oldMethod = descriptor.value;
    const oldGet = descriptor.get;
    const oldSet = descriptor.set;
    if (typeof oldMethod === 'function') {
      return {
        value: Ember.computed(...properties, function (...args: any[]) {
          return oldMethod.apply(this, args);
        })
      }
    } else if (typeof oldGet === 'function' || typeof oldSet === 'function') {
      return {
        value: Ember.computed(...properties, {
          get() {
            return oldGet.apply(this);
          },
          set(key, value) {
            oldSet.call(this, value);
            return value;
          }
        })
      }
    }

    return descriptor;
  }
}

class Test2 extends Ember.Controller {
  first_name: string
  last_name: string
  @cpDecorator('first_name', 'last_name')
  fullName2() {
    return `${this.first_name} + ${this.last_name}`;
  }
  @cpDecorator('first_name', 'last_name')
  get fullName() {
    return `${this.first_name} + ${this.last_name}`;
  }
  //and set
  set fullName(value: string) {
    // TODO: setters could not return value
    console.log(value);
  }
};
export default Test2