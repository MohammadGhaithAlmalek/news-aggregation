export interface NytArticle {
  _id: string;
  headline: { main: string };
  abstract: string;
  byline: { original: string };
  web_url: string;
  pub_date: string;
  multimedia?: { url: string }[];
}

export interface NytResponse {
  response: {
    docs: NytArticle[];
  };
}
