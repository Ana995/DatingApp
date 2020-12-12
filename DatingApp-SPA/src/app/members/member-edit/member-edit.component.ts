import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import {User} from '../../_models/user';
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm:NgForm;
  user:User;
  photoUrl : string;
  //in case the windows is closed
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }

  constructor(private route:ActivatedRoute, private alertify:AlertifyService,
  private userService: UserService, private authService:AuthService) { }

  ngOnInit() {
     this.route.data.subscribe(data => {this.user = data['user'] });
     this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl= photoUrl);
  }
  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe( next => {
         this.alertify.success('Profile updated successfuly');
         this.editForm.reset(this.user);
    }, error => {
       this.alertify.error(error);
    })
 
  }
updateMainPhoto(photoUrl){
  this.user.photoURL = photoUrl;
}

}
