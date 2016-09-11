import Ember from 'ember';

export default Ember.Controller.extend({
    // Workaround since the TS definition for Window doesn't include process (which isn't available in regular browser contexts).
    process: (<any>window).process
});
