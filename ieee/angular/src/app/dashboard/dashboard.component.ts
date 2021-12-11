import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { dashboardData } from '../data.model';

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
  biased=0
  unbiased=0
  public donutColors1=[
    {
      backgroundColor: [
        'rgba(92, 184, 92,1)',
        'rgba(217, 83, 79,1)',
          'rgba(255, 195, 0, 1)',
          'rgba(129, 78, 40, 1)',
          'rgba(129, 199, 111, 1)'
      ]
    }
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    
  };
  public pieChartLabels: Label[] = ["positive","negative", "neutral"];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public analyzed_data:dashboardData[]=[];
  // public company_name2=""

  constructor(private route:ActivatedRoute,private _service:GetDataService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  
  async ngOnInit(): Promise<void> {
    this.company_name=this.route.snapshot.paramMap.get("key")
    // console.log(this.company_name)
    var data=await this._service.searchCompanyAnalysis(encodeURI(this.company_name))
    var nonanalyzed_data=[]
    this.symbol=data[0].symbol
    this.market_cap=data[0].market_cap
    // this.company_name2=data[0].company_name
    // console.log(this.company_name2)
    var  titles=[""]
    for(var art of data){
      if(titles.includes(art.title)){
        continue
      }
      if(art.subjectivity==0.0 && art.positive==0 && art.negative==0 && art.neutral==0){
        nonanalyzed_data.push(art)
      }
      else{
        this.analyzed_data.push(art)
        titles.push(art.title)
        if(Number(art.positive)>Number(art.negative) && Number(art.positive)>Number(art.neutral))
        {
          this.positive_article++
          console.log(art)
        }
        else if (Number(art.negative)>Number(art.positive) && Number(art.negative)>Number(art.neutral)){
          this.negative_article++
        }
        else if (Number(art.neutral)>Number(art.negative) && Number(art.neutral)>Number(art.positive)){
          this.neutral_article++
        }
        this.total_article++
        if(Number(art.subjectivity)>0.5){
          this.biased++
        }
        else{
          this.unbiased++
        }
      }
      
    }
    this.pieChartData.push(this.positive_article)
    this.pieChartData.push(this.negative_article)
    this.pieChartData.push(this.neutral_article)
    
    
  }
    
  
}
