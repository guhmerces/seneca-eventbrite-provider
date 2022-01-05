import { handle_request } from '../helper'
import { InitalCommandsArgs } from '../types'

function discount(args: InitalCommandsArgs) {
  async function load_discount(this: any, msg: any) {
    const { id } = msg.q

    const get_discount_req = handle_request(args.eventbrite.request, `/discounts/${id}/`)

    const discount = await get_discount_req()

    return this.make$(args.ZONE_BASE + 'discount').data$(discount)
  }

  async function save_discount(this: any, msg: any) {
    const ent: any = msg.ent
    const id: string = ent.id

    const body = {
      discount: {
        type: ent.type,
        code: ent.code,
        amount_off: ent.amount_off,
        percent_off: ent.percent_off,
        event_id: ent.event_id,
        ticket_class_ids: ent.ticket_class_ids,
        quantity_available: ent.quantity_available,
        start_date: ent.start_date,
        start_date_relative: ent.start_date_relative,
        end_date: ent.end_date,
        end_date_relative: ent.end_date_relative,
        ticket_group_id: ent.ticket_group_id,
        hold_ids: ent.hold_ids,
      },
    }

    const save_discount_req = handle_request(args.eventbrite.request, `/discounts/${id}/`)

    const discount = await save_discount_req({
      method: 'POST',
      body: JSON.stringify(body),
    })

    return this.make$(args.ZONE_BASE + 'discount').data$(discount)
  }

  return {
    load_discount,
    save_discount,
  }
}

export default discount
