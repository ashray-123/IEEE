import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dashboardData, dataMod } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private readonly http: HttpClient) { }
  base_url = "http://localhost:3000/view-data";

  //get all the articles
  getAllCompanyNames():Observable<string[]>{
    return this.http.get<string[]>(this.base_url+"/company-list");
  }

  getAllCompanies():Observable<Map<string,string>[]>{
    return this.http.get<Map<string,string>[]>(this.base_url+"/companies");
  }

  searchCompanyAnalysis(company_name:string):Observable<dashboardData[]>{
    return this.http.get<dashboardData[]>(this.base_url+"/search-company/"+ company_name);
  }
}
