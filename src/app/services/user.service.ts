import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getUserDetails(userId: string): Observable<UserModel> {
    const apiUrl = `http://localhost:3000/api/users/${userId}`;

    return this.httpClient.get<UserModel>(apiUrl);
  }
}
