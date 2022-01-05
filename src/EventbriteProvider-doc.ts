/* Copyright © 2021 Seneca Project Contributors, MIT License. */


const event_docs = {

  loadEvent: {
    desc: 'Load an Eventbrite event data into an entity.',
  },

  saveEvent: {
    desc: 'Update an Eventbrite event data from an entity.',
  },

}

const media_docs = {
  load_media: {
    desc: 'Load an Eventbrite Media data into an entity.'
  },

  save_media: {
    desc: 'Update an Eventbrite Media data from an entity.'
  },

  load_media_upload: {
    desc: 'Load an Eventbrite Media Upload data into an entity.'
  }  
}

const docs = {
  ...event_docs,
  ...media_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
