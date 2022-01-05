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

describe('eventbrite-discount', () => {

  // Note: provide a discount_id
  // The authenticated user should be allowed to retrive the information of the specific discount
  const discount_id = '609282579'

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

  test('discount-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const id = discount_id

    const discount = await seneca.entity('provider/eventbrite/discount').load$(id)

    expect(discount).toBeDefined()

    expect(discount.entity$).toEqual('provider/eventbrite/discount')

    expect(discount.id).toBeDefined()
    expect(discount.id).toBe(id)

    expect(discount).toHaveProperty('code')
  })

  test('discount-save', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const id = discount_id

    let discount = await seneca.entity('provider/eventbrite/discount').load$(id)

    const randomBytes = crypto.randomBytes(12).toString('hex')

    discount.code = randomBytes

    discount = await discount.save$()

    expect(discount.entity$).toEqual('provider/eventbrite/discount')

    expect(discount).toBeDefined()
    expect(discount.id).toBeDefined()
    expect(discount.id).toEqual(id)

    expect(discount).toHaveProperty('code')
    expect(discount.code).toBe(randomBytes)
  })
})

