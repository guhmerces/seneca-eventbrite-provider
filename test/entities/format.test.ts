/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'

import EventbriteProvider from '../../src/eventbrite-provider'

const Seneca = require('seneca')

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/../local-config-template.js')) {
  Object.assign(CONFIG, require(__dirname + '/../local-config-template.js'))
}

describe('eventbrite-format', () => {

  const format_id = '100'

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

  test('format-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const format = await seneca.entity('provider/eventbrite/format').load$(format_id)

    expect(format).toBeDefined()

    expect(format.entity$).toEqual('provider/eventbrite/format')

    expect(format.id).toBeDefined()
    expect(format.id).toBe(format_id)

    expect(format).toHaveProperty('name')
  })
})
