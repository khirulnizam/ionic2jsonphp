import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

//for onlineDB
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private http:HttpClient
	) {
    
  }//end constructor

  mainForm: FormGroup;//hold data from formgroup
  Data:any[] = []//hold resultsets of records

  ngOnInit(){//on screen init
    this.mainForm = this.formBuilder.group({
      nokp: [''],//reset data form
      nama: [''],
      pendapatan: [''],
    })
  }//end ngOnInit

  //urlinsertbanyak:any="http://khirulnizam.com/training/1nsertbanyakorang.php";
  //urlinsert1orang:any="http://khirulnizam.com/training/1nsert1orang.php";//server
  urlinsert1orang:any="http://192.168.1.104/training/1nsert1orang.php";//local
  
  headers:HttpHeaders;
  success:any;
  error:any;
  orangdata:any;

  simpanOnline(){
    if(this.mainForm.value.nokp!=null || this.mainForm.value.nokp!=""){
      this.orangdata={
        'nokp':this.mainForm.value.nokp,
        'nama':this.mainForm.value.nama,
        'pendapatan':this.mainForm.value.pendapatan,
      };
      //headers
      
      this.headers=new HttpHeaders();
      this.headers.append('ContentType', 'application/json');
      //transmit to server
      this.http.post(this.urlinsert1orang,this.orangdata,{headers:this.headers})
        .subscribe(data=>{
          this.success = data['success'];
          this.error = data['error'];
          //console.log('berjaya');
          console.log(this.success);
          console.log(this.error);
          alert("Data orang asal telah dihantar, terima kasih... success="+this.success);
      },error=> {
        //console.log('error');
          console.log(this.success);
          console.log(this.error);
          alert("Maaf simpanan rekod ada masalah");
      });
    }else{
      alert ("Pastikan NOKP diisi");
    }
  }//simpanOnline
}
