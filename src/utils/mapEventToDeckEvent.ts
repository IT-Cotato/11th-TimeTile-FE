import { EventData } from "@/model/components/Event";
import { DeckEventData } from "@/model/components/DeckEvent";

export const mapEventToDeckEvent = (event: EventData): DeckEventData => {
  return {
    eventId: String(event.eventId),
    groupId: event.groupId,

    name: event.name,
    description: event.description,
    source: event.source,

    startedAt: event.startedAt,
    endedAt: event.endedAt ?? "",

    activityTypes: event.activityTypes,
    relatedArtists: event.relatedArtists,
    relatedEvents: event.relatedEvents,

    relatedMaterials: [],

    contributorCount: event.contributorCount,
  };
};
