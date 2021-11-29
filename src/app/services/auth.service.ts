import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authState:any=null;
  constructor(private afu:AngularFireAuth, private route:Router, private fireservice:AngularFirestore) {
    this.afu.authState.subscribe((auth =>{
      this.authState=auth;
    }))
   }
   // all firebase getdata functions
   
   get isUserAnonymousLoggedIn():boolean{
     return (this.authState!==null)? this.authState.isAnonymous: false;
   }
   get currentUserId():string{
     return (this.authState!==null)? this.authState.uid: ""
   }
   get currentUserName():string{
     return this.authState['email']
   }
   get currentUser():any{
     return (this.authState!==null)? this.authState: null;
   }
   get isUserEmailLoggedIn():boolean{
     if((this.authState!==null) && (!this.isUserAnonymousLoggedIn)){
       return true;
     }else {
       return false;
     }
   }

   registerWithEmail(email:string, password:string){
     return  this.afu.createUserWithEmailAndPassword(email,password).then((user)=>{
       this.authState=user
     }).catch(error=>{
       console.log(error)
       throw error
     })
   }
   loginWithEmail(email:string, password:string){
     return this.afu.signInWithEmailAndPassword(email,password).then((user)=>{
      this.authState=user
    }).catch(error=>{
      console.log(error)
      throw error
    })
   }

   signout():void{
     this.afu.signOut();
     this.route.navigate(['/login'])
   }
   // employ CRUD details------

   
  create_Newemployee(Record){
    return this.fireservice.collection('Employee').add(Record);
  }
  get_AllEmployee(){
    return this.fireservice.collection('Employee').snapshotChanges();
  }
  update_Employee(recordid, record){
    this.fireservice.doc('Employee/' + recordid).update(record);
  }
  delete_Employee(record_id){
    this.fireservice.doc('Employee/' + record_id).delete();
  }
}
