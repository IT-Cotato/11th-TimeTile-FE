import { RelatedArtist, RelatedEvent } from "../dto/event";

export interface DeckEventMaterial {
  postId: number;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
}

export interface DeckEventData {
  eventId: string;
  groupId: string;

  name: string;
  description: string;
  source: string;

  startedAt: string;
  endedAt: string;

  activityTypes: string[];
  relatedArtists: RelatedArtist[];
  relatedEvents: RelatedEvent[];

  relatedMaterials: DeckEventMaterial[];
  contributorCount: number;
}
