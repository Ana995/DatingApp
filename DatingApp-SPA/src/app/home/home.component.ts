import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode=false;
  values: any;
  constructor(private http: HttpClient) {  }

  ngOnInit() {
    this.getValues();
  }

  registerToggle()
{
   this.registerMode = !this.registerMode;
}

// tslint:disable-next-line: typedef
getValues(){
  this.http.get('http://localhost:5003/api/values').subscribe(reponse => {
      this.values = reponse;
   }, error => {
       console.log(error);
   });
}
cancelRegisterMode(registerMode: boolean){
   this.registerMode = registerMode;
}
}
