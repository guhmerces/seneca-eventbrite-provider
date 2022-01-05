import category from "./entities/category"
import format from "./entities/format"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
    format: format(initial_args),
  }
}

export default init_commands
