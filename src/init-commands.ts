import category from "./entities/category"
import media from "./entities/media"
import { InitalCommandsArgs } from "./types"

function init_commands(initial_args: InitalCommandsArgs) {
  return {
    category: category(initial_args),
    media: media(initial_args),
  }
}

export default init_commands
