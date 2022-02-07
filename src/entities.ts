import { EntityMap } from "./types";

const entities: EntityMap = {
  event: {
    actions: {
      load: {
        request: {
          method: "get",
          path: "/events/:event_id/",
        },
        before: [
          { on:'query', field: 'attribute', set: { query: 'event_id' } }
        ]
      },
      save: {
        request: {
          method: "post",
          path: "/events/:event_id",
          body_spec: {
            event: {
              name: {
                html: 'string',
              },
              description: {
                html: 'string',
              },
              start: {
                timezone: 'string',
                utc: 'string',
              },
              end: {
                timezone: 'string',
                utc: 'string',
              },
              currency: 'string',
              online_event: 'string',
              organizer_id: 'string',
              listed: 'string',
              shareable: 'string',
              invite_only: 'string',
              show_remaining: 'string',
              password: 'string',
              capacity: 'string',
              is_reserved_seating: 'string',
              is_series: 'string',
              show_pick_a_seat: 'string',
              show_seatmap_thumbnail: 'string',
              show_colors_in_seatmap_thumbnail: 'string',
            }
          }
        }
      }
    },    
  }
}

export { entities }