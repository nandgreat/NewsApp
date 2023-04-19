
export type NewResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type Article = {
  source: Source;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: null | string;
  publishedAt: Date;
  content: string;
}

export type Source = {
  id: null | string;
  name: string;
}
