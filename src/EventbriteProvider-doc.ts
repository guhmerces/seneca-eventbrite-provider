/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const event_docs = {

  loadEvent: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  saveEvent: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

const docs = {
  ...event_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
