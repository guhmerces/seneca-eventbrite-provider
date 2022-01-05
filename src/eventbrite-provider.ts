/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import Eventbrite from 'eventbrite'
import { Sdk } from 'eventbrite/lib/types'
import init_commands from './init-commands'

type EventbriteProviderOptions = {}


function EventbriteProvider(this: any, options: any) {
  const seneca: any = this

  let API_KEY = ''

  let eventbrite: Sdk

  const inital_args: any = {
    ZONE_BASE: 'provider/eventbrite/',
    eventbrite: undefined,
  }

  const commands = init_commands(inital_args)

  seneca
    .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:event', loadEvent)
    .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:event', saveEvent)

    .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:category', commands.category.load_category)

    .message('role:entity,cmd:load,zone:provider,base:eventbrite,name:discount', commands.discount.load_discount)
    .message('role:entity,cmd:save,zone:provider,base:eventbrite,name:discount', commands.discount.save_discount)

  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:eventbrite,key:api')
    if (out.ok) {
      API_KEY = out.value

      eventbrite = inital_args.eventbrite = Eventbrite({ token: API_KEY })
      Object.freeze(inital_args)
    }
    else {
      this.fail('api-key-missing')
    }
  })


  async function loadEvent(this: any, msg: any) {
    const q: any = msg.q
    const eventID: string = q.id

    try {
      const event: any = await eventbrite.request(`/events/${eventID}`)
      const ent = this.make$('provider/eventbrite/event').data$(event)
      return ent
    }
    catch (e: any) {
      // TODO: better error description
      throw new Error('Eventbrite Error: ' + JSON.stringify(e.parsedError))
    }
  }


  async function saveEvent(this: any, msg: any) {
    const ent: any = msg.ent
    const eventID: string = ent.id

    const body = JSON.stringify({
      event: {
        description: {
          html: ent.summary,
        },
      },
    })

    // Missing a slash at the end of the URL cause the Fetch API to not handle POST requests correctly.
    const event: any = await eventbrite.request(`/events/${eventID}/`, {
      method: 'POST',
      body,
    })

    const out = this.make$('provider/eventbrite/event').data$(event)

    console.log('SAVE', out)

    return out
  }
}


// Default options.
const defaults: EventbriteProviderOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(EventbriteProvider, { defaults })

export default EventbriteProvider

if ('undefined' !== typeof (module)) {
  module.exports = EventbriteProvider
}
