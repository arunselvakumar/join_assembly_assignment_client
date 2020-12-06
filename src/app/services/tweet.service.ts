import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StatModel } from "../models/stat.model";
import { TweetModel } from "../models/tweet.model";

@Injectable({
  providedIn: "root",
})
export class TweetService {
  constructor(private readonly httpClient: HttpClient) {}

  getStatsForUser(userId: string): Observable<StatModel> {
    const apiUrl = `http://localhost:3000/api/tweets/${userId}/stats`;

    return this.httpClient.get<StatModel>(apiUrl);
  }

  getTweetsByTag(tag: string): Observable<TweetModel[]> {
    const apiUrl = `http://localhost:3000/api/tweets/search?q=${tag}`;

    return this.httpClient.get<TweetModel[]>(apiUrl);
  }
}
