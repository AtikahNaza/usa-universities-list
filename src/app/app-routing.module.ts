import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniListComponent } from './uni-list/uni-list.component';

const routes: Routes = [
  { path: '', component: UniListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
