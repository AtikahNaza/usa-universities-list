import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UniApiService } from '../services/uni-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ITop10University } from '../university';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements AfterViewInit {
  displayedColumns: string[] = ['rank', 'name', 'country', 'alpha_two_code', 'stateProvince', 'web', 'domain'];
  dataSource: MatTableDataSource<ITop10University> = [] as any;
  allTop10Uni = [] as any;
  allUni = [] as any;
  top10uni = [] as any;
  loader = true;

  constructor(private uniApi: UniApiService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //get rank
    this.uniApi.getTop10University()
      .subscribe(x => {
        this.top10uni = x;
      });
    //get all uni
    this.uniApi.getUniversity()
      .subscribe(o => {
        this.allUni = o.filter((value, index) => o.indexOf(value) === index);
        for (let i = 0; i < this.top10uni.length; i++) {
          //join uni rank and get all the details for the top 10
          this.allTop10Uni.push(this.getUniByName(this.top10uni[i].name, this.allUni, this.top10uni[i].rank));
          this.allTop10Uni = this.allTop10Uni.flat();
        }
        this.dataSource = new MatTableDataSource(this.allTop10Uni);
        this.loader = false;
      });
  }

  getUniByName(name: String, arr: [], ranking: number) {
    const topuniarray = arr.filter((proj: any) => proj.name === name);
    if (topuniarray.length > 1) {
      for (let i = 0; i < topuniarray.length - 1; i++) {
        topuniarray.pop();
      }
    }
    topuniarray.forEach((x: any) => {
      if (x.name = name) {
        x.rank = ranking;
      }
    })
    return topuniarray;
  }
}

