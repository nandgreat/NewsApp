import { Article } from "../redux/newsList/response";

export type RootStackParamList = {
  HomeScreen: undefined;
  Login: {
    from: string;
  };
  NewsDetailScreen: {
    newsItem: Article
  }
};
