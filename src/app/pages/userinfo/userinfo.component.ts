import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(public authservice:AuthService, private router:Router) { }
  employee: any;
  employeeName:  string;
  employeeAge: number;
  employeeAddress: string;
  message:string
   

    ngOnInit(){
      this.authservice.get_AllEmployee().subscribe(data =>{
        this.employee = data.map(e =>{
          return {
            id: e.payload.doc.id,
            isedit: false,
            name: e.payload.doc.data()['name'],
            age: e.payload.doc.data()['age'],
            address: e.payload.doc.data()['address'],
          };
        })
        console.log(this.employee);
      });
    }

    CreateRecord(){
      let Record = {}
    Record['name']=this.employeeName
    Record['age']=this.employeeAge
    Record['address']=this.employeeAddress
    alert("Do you want to save data?") 
     
     this.authservice.create_Newemployee(Record).then(res => {
         this.employeeName=""
         this.employeeAge=undefined
         this.employeeAddress=""
        console.log(res)
        
       
     }).catch(error =>{
       console.log(error);
     });

    }

    EditRecord(Record){
      Record.isedit = true;
      Record.editname=Record.name;
      Record.editage=Record.age;
      Record.editaddress=Record.address;


    }

    UpdateRecord(recorddata){
      let record ={};
      record['name']=recorddata.editname;
      record['age']=recorddata.editage;
      record['address']=recorddata.editaddress;
      this.authservice.update_Employee(recorddata.id, record);
      recorddata.isedit=false;
    }

    DeleteRecord(record_id){
      alert("Do you want to delete data?")
      this.authservice.delete_Employee(record_id);
    }

}
