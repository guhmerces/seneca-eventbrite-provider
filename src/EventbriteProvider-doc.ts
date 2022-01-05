/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const event_docs = {

  loadEvent: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  saveEvent: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

const display_settings_docs = {
  load_display_settings: {
    desc: 'Load an Eventbrite Display Settings data into an entity.',
  },

  save_display_settings: {
    desc: 'Update an Eventbrite Display Settings data from an entity.',
  },
}

const docs = {
  ...event_docs,
  ...display_settings_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
