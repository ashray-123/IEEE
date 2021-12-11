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
  symbol=""
  market_cap!:number;
  total_article:number=0;
  positive_article=0;
  negative_article=0;
  neutral_article=0;
  constructor(private route:ActivatedRoute,private _service:GetDataService) { }

  async ngOnInit(): Promise<void> {
    this.company_name=this.route.snapshot.paramMap.get("key")
    console.log(this.company_name)
    var data=await this._service.searchCompanyAnalysis(encodeURI(this.company_name))
    var analyzed_data=[]
    var nonanalyzed_data=[]
    this.symbol=data[0].symbol
    this.market_cap=data[0].market_cap
    for(var art of data){
      if(art.subjectivity==0.0 && art.positive==0 && art.negative==0 && art.negative==0){
        nonanalyzed_data.push(art)
      }
      else{
        analyzed_data.push(art)
        if(art.positive>art.negative && art.positive>art.neutral){
          this.positive_article++
          console.log(art)
        }
        else if (art.negative>art.positive && art.negative>art.neutral){
          this.negative_article++
        }
        else if (art.neutral>art.negative && art.neutral>art.positive){
          this.neutral_article++
        }
      }
      
    }
    this.total_article=analyzed_data.length;
  }
    // console.log(nonanalyzed_data)  }
  
}
