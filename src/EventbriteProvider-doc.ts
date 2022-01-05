/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const event_docs = {

  loadEvent: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  saveEvent: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

const discount_docs = {

  load_discount: {
    desc: 'Load an Eventbrite Discount data into an entity.',
  },

  save_discount: {
    desc: 'Update an Eventbrite Discount data from an entity.',
  },

}

const docs = {
  ...event_docs,
  ...discount_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
