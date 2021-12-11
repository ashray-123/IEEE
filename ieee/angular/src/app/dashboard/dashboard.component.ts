import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  company_name:any="";
  constructor(private route:ActivatedRoute,private _service:GetDataService) { }

  async ngOnInit(): Promise<void> {
    this.company_name=this.route.snapshot.paramMap.get("key")
    console.log(this.company_name)
    var data=await this._service.searchCompanyAnalysis()
    console.log(data)
  }

}
