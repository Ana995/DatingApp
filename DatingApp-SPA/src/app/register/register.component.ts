import { Router } from '@angular/router';
import { User } from './../_models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
   
  user: User;
  registerForm: FormGroup;
  bsConfig:Partial<BsDatepickerConfig>;


  constructor( private authService: AuthService, private alertify : AlertifyService,private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass:'theme-dark-blue'};
   this.createRegisterForm();
 
  };

  passwordConfirmationValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
    }
  createRegisterForm(){
    this.registerForm= this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:['', Validators.required]
    }, {validator:this.passwordConfirmationValidator})
  }

  register(){
    if(this.registerForm.valid){
       this.user = Object.assign({}, this.registerForm.value);
      
       this.authService.register(this.user).subscribe(() => {
         this.alertify.success("Registration successful");
       }, error=>{
         this.alertify.error(error);
       }, () => {
          this.authService.login(this.user).subscribe(()=>{
            this.router.navigate(['/members']);
          });
       });
    }
  }
  cancel(){

    this.cancelRegister.emit(false);  }

}
