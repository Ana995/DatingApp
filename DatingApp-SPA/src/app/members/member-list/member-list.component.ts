import { Pagination } from '../../_models/pagination';
import { PaginatedResult } from '../../_models/pagination';

import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_models/user';
import {AlertifyService} from '../../_services/alertify.service';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 users: User[];
 user: User=JSON.parse(localStorage.getItem('user'));
 genderList = [{value: 'male', display:'Males'}, {value:'female', display:'Females'}];
 userParams: any={};
 pag: Pagination;
  constructor(private userService: UserService, private alertify:AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
       this.users=data['users'].result;
       this.pag = data['users'].pagination;
    });
    this.userParams.gender = this.user.gender ==='female'? 'male':'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy ='lastActive';
  }
  
 pageChanged(event: any): void {
   this.pag.currentPage = event.page;
   this.loadUsers();
 }
 resetFilters()
{
    this.userParams.gender = this.user.gender ==='female'? 'male':'female';
    this.userParams.minAge =18;
    this.userParams.maxAge=99;
    this.loadUsers();
} 
loadUsers(){
   this.userService.getUsers(this.pag.currentPage, this.pag.itemsPerPage,this.userParams)
   .subscribe((res: PaginatedResult<User[]>) => {
      this.users=res.result;
      this.pag= res.pagination;
   }, error =>{
      this.alertify.error(error);
      
   });
 }
}
