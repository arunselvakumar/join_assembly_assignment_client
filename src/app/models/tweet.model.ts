export interface TweetModel {
  user: {
    id: string;
    name: string;
  };
  urls: any[];
  hashtags: string[];
  _id: string;
  profileId: string;
  id: string;
  text: string;
}
