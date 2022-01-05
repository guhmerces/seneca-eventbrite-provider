import { handle_request } from '../helper'
import { InitalCommandsArgs } from '../types'

function display_settings(args: InitalCommandsArgs) {
  async function load_display_settings(this: any, msg: any) {
    const { event_id } = msg.q

    const get_display_settings = handle_request(args.eventbrite.request, `/events/${event_id}/display_settings/`)

    let display_settings = await get_display_settings()

    display_settings = {
      ...display_settings,
      event_id
    }

    return this.make$(args.ZONE_BASE + 'display_settings').data$(display_settings)
  }

  async function save_display_settings(this: any, msg: any) {
    const ent: any = msg.ent
    const event_id: string = ent.event_id

    const body = {
      display_settings: {
        show_start_date: ent.show_start_date,
        show_end_date: ent.show_end_date,
        show_start_end_time: ent.show_start_end_time,
        show_timezone: ent.show_timezone,
        show_map: ent.show_map,
        show_remaining: ent.show_remaining,
        show_organizer_facebook: ent.show_organizer_facebook,
        show_organizer_twitter: ent.show_organizer_twitter,
        show_facebook_friends_going: ent.show_facebook_friends_going,
        terminology: ent.terminology,
      }
    }

    const save_display_settings = handle_request(args.eventbrite.request,`/events/${event_id}/display_settings/`)

    const display_settings = await save_display_settings({
      method: 'POST',
      body: JSON.stringify(body),
    })

    return this.make$(args.ZONE_BASE + 'display_settings').data$(display_settings)
  }

  return {
    load_display_settings,
    save_display_settings,
  }
}

export default display_settings
