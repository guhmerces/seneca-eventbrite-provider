/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite';
import { Sdk } from 'eventbrite/lib/types';

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbriteSDK: Sdk

  seneca
    .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:event', loadEvent)
    .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:event', saveEvent)


  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api')
    if (out.ok) {
      API_KEY = out.value
      eventbriteSDK = Eventbrite({token: API_KEY})
    }
    else {
      this.fail('api-key-missing')
    }
  })

  async function loadEvent(this: any, msg: any) {
    const q: any = msg.q
    const eventID: string = q.id

    const event: any = await eventbriteSDK.request(`/events/${eventID}`)

    if(event.id) {
      event.eventbrite_id = event.id
      event.id = eventID
    }

    return this.make$('eventbrite/event').data$(event)
  }

  async function saveEvent(this: any, msg: any) {
    const ent: any = msg.ent
    const eventID: string = ent.id

    const body = JSON.stringify({
      event: {
        description: {
          html: ent.description.html,
        },
      },
    })

    // Missing a slash at the end of the URL cause the Fetch API to not handle POST requests correctly.
    const event: any = await eventbriteSDK.request(`/events/${eventID}/`, {
      method:'POST',
      body,
    })

    if(event.id) {
      event.eventbrite_id = event.id
      event.id = eventID
    }

    return this.make$('eventbrite/event').data$(event)
  }
}


// Default options.
const defaults: EventbriteProviderOptions = {
}


Object.assign(EventbriteProvider, { defaults })

export default EventbriteProvider

if ('undefined' !== typeof (module)) {
  module.exports = EventbriteProvider
}
