import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private getDataService: GetDataService) { }

  myControl:any = new FormControl();
  filteredOptions!: Observable<string[]>;
  companies!: string[];

  async ngOnInit(): Promise<void> {

    await this.getDataService.getAllCompanyNames().then((data) =>{
      this.companies = data
      console.log(data)
    }
    );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value1 => this._filterbats(<string>value1))
      );
  }

  private _filterbats(value: string): String[] {
    const filterValue = value.toLowerCase();  
    return this.companies.filter(option => option.toLowerCase().includes(filterValue));
  }

}


