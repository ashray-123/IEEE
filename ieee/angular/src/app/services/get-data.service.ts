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
  async getAllCompanyNames():Promise<string[]>{
    return  await this.http.get<string[]>(this.base_url+"/company-list").toPromise();
  }

  async getAllCompanies():Promise<Map<string,string>[]>{
    return await this.http.get<Map<string,string>[]>(this.base_url+"/companies").toPromise();
  }

  async searchCompanyAnalysis():Promise<dashboardData[]>{
    return await this.http.get<dashboardData[]>(this.base_url+"/search-company/").toPromise();
  }
  
}
