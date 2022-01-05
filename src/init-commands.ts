import category from "./entities/category"
import display_settings from "./entities/display-settings"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
    display_settings: display_settings(initial_args),
  }
}

export default init_commands
