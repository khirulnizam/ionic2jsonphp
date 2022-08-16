import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

//network chceker
import { NetworkCheckerService } from '../services/network-checker.service';

//for onlineDB
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private network: NetworkCheckerService,//for network chcker
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private http:HttpClient
	) 
  {
    this.mainForm = this.formBuilder.group({
      nokp: [''],//reset data form
      nama: [''],
      pendapatan: [''],
    })
  }//end constructor

  mainForm: FormGroup;//hold data from formgroup
  Data:any[] = []//hold resultsets of records

  async ngOnInit(){//on screen init

    await this.network.openCheckNetwork();
    await this.network.logNetworkState();

    
  }//end ngOnInit

  //urlinsertbanyak:any="https://khirulnizam.com/training/1nsertbanyakorang.php";
  urlinsert1orang:any="https://khirulnizam.com/training/1nsert1orang.php";//server
  //urlinsert1orang:any="https://192.168.1.103/training/1nsert1orang.php";//local
  //!!!!!!! must HTTPS
  
  headers:HttpHeaders;
  success:any;
  error:any;
  orangdata:any;

  simpanOnline(){
    if(this.network.onlineIndicator){
      alert("YES Network available");
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
      alert("NO-network available");
    }
  }//simpanOnline
}
