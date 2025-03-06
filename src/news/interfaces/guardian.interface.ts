// 📂 src/interfaces/guardian.interface.ts
export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: {
    trailText?: string;
    byline?: string;
    thumbnail?: string;
  };
}

export interface GuardianResponse {
  results: GuardianArticle[];
}
