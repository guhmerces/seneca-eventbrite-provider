import category from "./entities/category"
import discount from "./entities/discount"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
    discount: discount(initial_args),
  }
}

export default init_commands
