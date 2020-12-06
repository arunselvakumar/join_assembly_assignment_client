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
    const apiUrl = `https://join-assembly-server.azurewebsites.net/api/users/${userId}`;

    return this.httpClient.get<UserModel>(apiUrl);
  }
}
