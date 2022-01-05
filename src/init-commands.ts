import category from "./entities/category"
import inventory_tier from "./entities/inventory-tier"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
    inventory_tier: inventory_tier(initial_args),
  }
}

export default init_commands
