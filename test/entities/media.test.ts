/* Copyright © 2021 Seneca Project Contributors, MIT License. */

// https://www.eventbrite.com/manage/events/230866526997/details

import * as Fs from 'fs'

import EventbriteProvider from '../../src/eventbrite-provider'
import { MediaUploadType } from '../../src/types'

const Seneca = require('seneca')

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/../local-config-template.js')) {
  Object.assign(CONFIG, require(__dirname + '/../local-config-template.js'))
}

jest.setTimeout(10000)

describe('eventbrite-media', () => {
  // NOTE: you could get media_id by retrieving it's corresponding event
  const media_id = '207605529'

  const width = '10'
  const height = '15'

  let providerOptions = {
    provider: {
      eventbrite: {
        keys: {
          api: {
            value: CONFIG.key,
          },
        },
      },
    },
  }

  test('media-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
      id: media_id,
      width,
      height,
    }

    const media = await seneca.entity('provider/eventbrite/media').load$(attrs)

    expect(media).toBeDefined()

    expect(media.entity$).toEqual('provider/eventbrite/media')

    expect(media.id).toBeDefined()
    expect(media.id).toBe(attrs.id)

    expect(media).toHaveProperty('url')
  })

  test('media-save', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const attrs = {
      id: media_id,
      width,
      height,
    }

    let media = await seneca.entity('provider/eventbrite/media').load$(attrs)

    // Get upload token from api
    const upload_token_type: MediaUploadType = 'image-event-logo'
    const media_upload = await seneca.entity('provider/eventbrite/media_upload').load$(upload_token_type)

    // change media attribute before saving
    let crop_mask = {
      top_left: {
        y: 15,
        x: 15,
      },
      width: parseInt((Math.random() * 100).toString()), // random int between 0 and 100
      height: parseInt((Math.random() * 100).toString()), // random int between 0 and 100
    }

    media.crop_mask = crop_mask

    // Save
    media = await media.save$({ upload_token: media_upload.upload_token })

    // Assertions
    expect(media.entity$).toEqual('provider/eventbrite/media')

    expect(media).toBeDefined()
    expect(media.id).toBeDefined()
    expect(media.id).toEqual(attrs.id)

    expect(media).toHaveProperty('crop_mask')
    expect(media.crop_mask.width).toBe(crop_mask.width)
    expect(media.crop_mask.height).toBe(crop_mask.height)
  })

  test('media-upload-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', providerOptions)
      .use(EventbriteProvider)

    const id: MediaUploadType = 'image-event-logo'

    const media_upload = await seneca.entity('provider/eventbrite/media_upload').load$(id)

    expect(media_upload).toBeDefined()

    expect(media_upload.entity$).toEqual('provider/eventbrite/media_upload')

    expect(media_upload).toHaveProperty('upload_token')
    expect(media_upload.upload_token).toBeDefined()
  })
})
