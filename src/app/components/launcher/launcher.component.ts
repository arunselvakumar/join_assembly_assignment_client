import { DOCUMENT, KeyValue } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { UserModel } from "../../models/user.model";
import { TweetService } from "../../services/tweet.service";
import { StatModel } from "../../models/stat.model";
import { KeyValueModel } from "../../models/keyvalue.model";
import { TweetModel } from "../../models/tweet.model";

@Component({
  selector: "app-launcher",
  templateUrl: "./launcher.component.html",
  styleUrls: ["./launcher.component.scss"],
})
export class LauncherComponent implements OnInit {
  public user: UserModel;
  public tweetStat: StatModel;
  public userLinks: KeyValueModel[];
  public domainList: KeyValueModel[];

  public isTweetPageView: boolean;
  public isTweetsLoading: boolean;

  public isStatusLoading: boolean;

  public tweets: TweetModel[];

  constructor(
    private readonly _userService: UserService,
    private readonly _tweetService: TweetService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.user = { id: "", displayName: "", profilePic: "" };

    this.tweetStat = {
      totalTweets: 0,
      totalTweetsWithUrls: 0,
      domainsWithCount: {},
      usersWithCount: {},
    };

    this.userLinks = [];
    this.domainList = [];

    this.tweets = [];
    this.isTweetPageView = false;
    this.isTweetsLoading = false;

    this.isStatusLoading = false;
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      const userId = params["redirectId"];
      const search = params["search"];
      if (search) {
        this.isTweetPageView = true;
        this._tweetService.getTweetsByTag(search).subscribe(
          (data) => (this.tweets = data),
          () => (this.isTweetsLoading = false),
          () => (this.isTweetsLoading = false)
        );
      } else {
        this.isTweetsLoading = false;
        this.isTweetPageView = false;
      }
      if (userId && !this.user.id) {
        this.isStatusLoading = true;
        this._userService.getUserDetails(userId).subscribe((user) => {
          this.user = user;
        });

        this._tweetService.getStatsForUser(userId).subscribe((stat) => {
          this.tweetStat = stat;
          for (let item in stat.domainsWithCount) {
            this.domainList.push({
              key: item,
              value: stat.domainsWithCount[item],
            });
          }

          for (let item in stat.usersWithCount) {
            this.userLinks.push({
              key: item,
              value: stat.usersWithCount[item],
            });
          }

          this.domainList = this.domainList.sort((x, y) => +y.value - +x.value);
          this.userLinks = this.userLinks.sort((x, y) => +y.value - +x.value);
          this.isStatusLoading = false;
        });
      }
    });
  }

  public onSignInWithTwitterButtonClicked(): void {
    this.document.location.href = "https://join-assembly-server.azurewebsites.net/auth";
  }

  public async onSearchClicked(value: string): Promise<void> {
    this.isTweetsLoading = true;
    this.isTweetPageView = true;
    await this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        search: value,
      },
      queryParamsHandling: "merge",
    });
  }
}
