import { Sdk } from 'eventbrite/lib/types'

type Eventbrite = Sdk

type InitalCommandsArgs = {
  eventbrite: Eventbrite
  ZONE_BASE: string
}

type MediaUploadType =
  | 'image-event-logo'
  | 'image-event-logo-preserve-quality'
  | 'image-event-view-from-seat'
  | 'image-organizer-logo'
  | 'image-user-photo'
  | 'image-structured-content'

export type {
  Eventbrite,
  InitalCommandsArgs,
  MediaUploadType
}
