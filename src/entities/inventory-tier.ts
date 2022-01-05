import { handle_request } from '../helper'
import { InitalCommandsArgs } from '../types'

function inventory_tier(args: InitalCommandsArgs) {
  async function load_inventory_tier(this: any, msg: any) {
    const { id, event_id } = msg.q

    const get_inventory_tier = handle_request(
      args.eventbrite.request,
      `/events/${event_id}/inventory_tiers/${id}`
    )

    const response = await get_inventory_tier()

    let inventory_tier = response.inventory_tier

    return this.make$(args.ZONE_BASE + 'inventory_tier').data$(inventory_tier)
  }

  async function save_inventory_tier(this: any, msg: any) {
    const ent: any = msg.ent
    const { id, event_id } = ent

    const body = {
      inventory_tier: {
        name: ent.name,
        sort_order: ent.sort_order,
        color: ent.color,
        quantity_total: ent.quantity_total,
        image_id: ent.image_id,
        capacity_total: ent.capacity_total,
        holds: ent.holds
      }
    }

    const req_options = {
      method: 'POST',
      body: JSON.stringify(body),
    }

    const save_inventory_tier_req = handle_request(
      args.eventbrite.request,
      `/events/${event_id}/inventory_tiers/${id}/`
    )

    const response = await save_inventory_tier_req(req_options)

    let inventory_tier = response.inventory_tier

    return this.make$(args.ZONE_BASE + 'inventory_tier').data$(inventory_tier)
  }

  return {
    load_inventory_tier,
    save_inventory_tier,
  }
}

export default inventory_tier
