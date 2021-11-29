import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 email=""
 password=""
 message=""
 errorMessage=" "    // validation error handle
  error:{name:string, message:string}={name:"", message:""};   //for firebase error handle
 
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
    clearErrorMessage(){
      this.errorMessage=""
      this.error={name:'', message:''}
    }  
   
  register(){
    
    this.clearErrorMessage();
      if(this.validateForm(this.email, this.password)){
        this.authservice.registerWithEmail(this.email, this.password).then(() =>{
          this.message="You are register with data"
          // this.router.navigate(['/userinfo'])
        }).catch(eerror=>{
          this.error=eerror
          this.router.navigate(['/register'])
        });
      }
  }
  validateForm(email:any, password:any){
    if(email.length === 0){
      this.errorMessage="please enter email id";
      return false;
    }
    if(password.length === 0){
      this.errorMessage="please enter password";
      return false;
    }
    if(password.length < 6){
      this.errorMessage="password should be at least 6 char";
      return false;
    }
    this.errorMessage='';
    return true;
  }
}








