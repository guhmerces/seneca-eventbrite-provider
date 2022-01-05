/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'
import crypto from 'crypto'

import EventbriteProvider from '../../src/eventbrite-provider'

const Seneca = require('seneca')

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/../local-config-template.js')) {
  Object.assign(CONFIG, require(__dirname + '/../local-config-template.js'))
}

jest.setTimeout(10000)

describe('eventbrite-inventory-tier', () => {

  const event_id = '238083523227'
  const inventory_tier_id = '11195969'

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

  test('inventory-tier-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
      event_id,
      id: inventory_tier_id
    }

    const inventory_tier = await seneca.entity('provider/eventbrite/inventory_tier').load$(attrs)

    expect(inventory_tier).toBeDefined()
    expect(inventory_tier.entity$).toEqual('provider/eventbrite/inventory_tier')
    expect(inventory_tier.id).toBeDefined()
    expect(inventory_tier.id).toBe(attrs.id)
  })

  test('inventory-tier-save', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
    event_id,
    id: inventory_tier_id
    }

    let inventory_tier = await seneca.entity('provider/eventbrite/inventory_tier').load$(attrs)

    const randomBytes = crypto.randomBytes(12).toString('hex')

    inventory_tier.name = randomBytes

    inventory_tier = await inventory_tier.save$()

    expect(inventory_tier.entity$).toEqual('provider/eventbrite/inventory_tier')

    expect(inventory_tier).toBeDefined()
    expect(inventory_tier.id).toBeDefined()
    expect(inventory_tier.id).toEqual(attrs.id)

    expect(inventory_tier).toHaveProperty('name')
    expect(inventory_tier.name).toBe(randomBytes)
  })
})

