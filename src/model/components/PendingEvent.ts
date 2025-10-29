interface DiffText {
  operation: "INSERT" | "DELETE" | "EQUAL";
  text: string;
}

interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

interface RelatedEvent {
  groupId: string;
  title: string;
}

export interface PendingEvent {
  eventId: number;
  name: DiffText[];
  description: DiffText[];
  source: DiffText[];
  startedAt: DiffText[];
  endedAt: DiffText[];
  addedRelatedArtists: RelatedArtist[];
  missingRelatedArtists: RelatedArtist[];
  addedRelatedEvents: RelatedEvent[];
  missingRelatedEvents: RelatedEvent[];
  addedActivityTypes: string[];
  missingActivityTypes: string[];
  addedRelatedMaterials: string[];
  missingRelatedMaterials: string[];
  editedAt: string;
  changeType: "NEW" | "EDITED";
}
