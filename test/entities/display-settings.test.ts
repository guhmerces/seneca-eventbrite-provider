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

describe('eventbrite-display-settings', () => {

  const event_id = ''

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

  test('display-settings-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
      event_id
    }

    const display_settings = await seneca.entity('provider/eventbrite/display_settings').load$(attrs)

    expect(display_settings).toBeDefined()

    expect(display_settings.entity$).toEqual('provider/eventbrite/display_settings')

    expect(display_settings).toHaveProperty('resource_uri')
    expect(display_settings).toHaveProperty('show_start_date')
  })

  test('display-settings-save', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

      const attrs = {
        event_id
      }

    let display_settings = await seneca.entity('provider/eventbrite/display_settings').load$(attrs)

    let status = display_settings.show_start_date

    // checks for show_start_date type and set attribute for its equivalent opposite value
    switch(status) {
      case true:
        status = !status
        break

      case 'true':
        status = 'false'
        break

      case 'false':
        status = 'true'
        break
    }

    display_settings.show_start_date = status

    display_settings = await display_settings.save$()

    expect(display_settings).toBeDefined()
    expect(display_settings.entity$).toEqual('provider/eventbrite/display_settings')

    expect(display_settings).toHaveProperty('show_start_date')
    expect(display_settings.show_start_date).toBe(status)
  })
})

