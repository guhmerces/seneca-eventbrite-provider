import { build_query_str, handle_request } from '../helper'
import { InitalCommandsArgs, MediaUploadType } from '../types'

function media(args: InitalCommandsArgs) {
  async function load_media(this: any, msg: any) {
    const { id, height, width } = msg.q

    const query_str = build_query_str({height, width})

    const get_media_req = handle_request(args.eventbrite.request, `/media/${id}/` + query_str)

    const media = await get_media_req()

    return this.make$(args.ZONE_BASE + 'media').data$(media)
  }

  async function save_media(this: any, msg: any) {
    const upload_token = msg.q.upload_token
    
    const ent: any = msg.ent
    const id = ent.id

    const body = {
      upload_token,
      crop_mask: ent.crop_mask
    }

    const save_media = handle_request(args.eventbrite.request, `/media/upload/`)

    const media = await save_media({
      method: 'POST',
      body: JSON.stringify(body),
    })

    return this.make$(args.ZONE_BASE + 'media').data$(media)
  }

  async function load_media_upload(this: any, msg: any) {
    const { id } = msg.q

    const type: MediaUploadType = id

    const query_str = build_query_str({type})

    const media_upload_req = handle_request(args.eventbrite.request, `/media/upload` + query_str)

    const media_upload = await media_upload_req()
    console.log(media_upload)
    return this.make$(args.ZONE_BASE + 'media_upload').data$(media_upload)
  }

  return {
    load_media,
    save_media,
    load_media_upload,
  }
}

export default media
