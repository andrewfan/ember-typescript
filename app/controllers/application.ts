import Ember from 'ember';
const {
    computed
} = Ember;


class Test extends Ember.Object {
    _value: string
    private getValue: () => ''
    private setValue(value: string) {
        return this._value = value;
    }
    value: Ember.ComputedProperty
    init() {
       this.value = computed({
           get:() => 'default',
         set:(key, value) => this.setValue(value)
       })
    }
    get tValue() :string{
       return this.getValue();
    }
    set tValue(value: string) {
        this.setValue(value)
    }
}
export default class extends Ember.Controller {
    greetPerson: Ember.ComputedProperty
    name: string
    test: Test
    init(...args: any[]) {
        this.test = new Test();

        this.greetPerson = computed('name', {
            get:() => 'default',
            set:(key, value) => this.greeter(value)
        });
    }
     (person: string) {
        this.test.tValue = person + 'tValue'
        return `Hello ${person}`;
    }
};
