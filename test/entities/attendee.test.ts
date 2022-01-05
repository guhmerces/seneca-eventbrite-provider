/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'

import EventbriteProvider from '../../src/eventbrite-provider'

const Seneca = require('seneca')

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/../local-config-template.js')) {
  Object.assign(CONFIG, require(__dirname + '/../local-config-template.js'))
}

jest.setTimeout(10000)

describe('eventbrite-attendee', () => {

  const event_id = ''
  const attendee_id = ''

  let providerOptions = {
    provider: {
      eventbrite: {
        keys: {
          api: {
            value: CONFIG.key
          }
        }
      }
    }
  }

  test('attendee-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
      event_id,
      id: attendee_id
    }

    const attendee = await seneca.entity('provider/eventbrite/attendee').load$(attrs)

    expect(attendee).toBeDefined()
    expect(attendee.entity$).toEqual('provider/eventbrite/attendee')
    expect(attendee.id).toBeDefined()
    expect(attendee.id).toBe(attrs.id)
  })
})

