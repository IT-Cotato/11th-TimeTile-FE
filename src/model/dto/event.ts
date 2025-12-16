export interface RelatedArtist {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface RelatedEvent {
  groupId: string;
  name: string;
}

export interface EventDTO {
  name: string;
  description: string;
  source: string;
  startedAt: string;
  endedAt: string;

  activityTypes: string[];
  relatedArtists: RelatedArtist[];
  relatedEvents: RelatedEvent[];
  relatedMaterials: string[];
}
