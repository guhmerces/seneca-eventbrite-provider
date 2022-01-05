import { handle_request } from '../helper'
import { InitalCommandsArgs } from '../types'

function format(args: InitalCommandsArgs) {
  async function load_format(this: any, msg: any) {
    const { id } = msg.q

    const get_format_req = handle_request(args.eventbrite.request, `/formats/${id}/`)

    const format = await get_format_req()

    return this.make$(args.ZONE_BASE + 'format').data$(format)
  }
  return {
    load_format,
  }
}

export default format 
