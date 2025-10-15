export interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface RelatedEvent {
  groupId: string;
  name: string;
}

export interface EventData {
  eventId: number;
  groupId: string;
  name: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  relatedMaterials: string[];
  contributorCount: number;
  activityTypes: string[];
  relatedArtists: RelatedArtist[];
  relatedEvents: RelatedEvent[];
}
