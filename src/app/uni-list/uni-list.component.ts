import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UniApiService } from '../services/uni-api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUniversity } from '../university';


@Component({
  selector: 'app-uni-list',
  templateUrl: './uni-list.component.html',
  styleUrls: ['./uni-list.component.css']
})
export class UniListComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['country', 'name', 'code', 'state', 'web', 'domain'];
  dataSource: MatTableDataSource<IUniversity> = [] as any;
  loader = true;
  uniSub = [] as any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private uniApi: UniApiService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.uniSub = this.uniApi.getUniversity()
      .subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.loader = false;
      });
  }

  ngOnDestroy() {
    this.uniSub.unsubscribe()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
