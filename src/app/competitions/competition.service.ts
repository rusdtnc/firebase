
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  getCompetitions() {
    return this.http.get("https://www.gs-tennis.com/api/equipes?codeClub=59400240&millesime=2019");
  }

}
