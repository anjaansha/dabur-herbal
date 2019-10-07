import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'; 

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageModal:any = "noneView";
  audioModal:any = "noneView";
  darkShadow:any = "noneView";
  collectIdModal = "noneView";
  msgModal1 = "noneView";
  selectedFile: ImageSnippet;
  form: FormGroup;
  name:any;
  email:any;
  contact:any;
  msg:any;
  termsChecker:boolean = false;
  base64;
  today: any = Date.now();
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
    MilliSeconds: "MilliSeconds"
  };

  
  constructor(private apiService: ApiService, public http: HttpClient, private formBuilder: FormBuilder, private router: Router) { 
   
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [''],
    });
  }
  

  // -------------------------------For Popups---------------------------------------
  upload(){
    this.imageModal = "blockView";
    this.darkShadow = "blockView";
  }
  record(){
    this.audioModal = "blockView";
    this.darkShadow = "blockView";
  }
  collectId(){
    if(this.termsChecker){
      this.collectIdModal = "flexView";
      this.darkShadow = "blockView";
      this.apiService.email = this.email;
      console.log(this.name);
      console.log(this.email);
      console.log(this.contact);
      const formData = new FormData();
      formData.append("Name",this.name);
      formData.append("EmailId",this.email);
      formData.append("MobileNumber",this.contact);
      formData.append("userfile",this.form.get('avatar').value);
      this.apiService.postApi('/api/User/register', formData).subscribe(data => {
        console.log(JSON.stringify(data));
        const jsonData = JSON.parse(JSON.stringify(data));
        if (jsonData.STATUS === 'SUCCESS' ) {
          Swal.fire('Success', 'Registered Successfully', 'success').then(data => {
            // this.router.navigate(['products']);
          });
        }
      });
    }else{
      this.msgModal1 = "flexView";
      this.darkShadow = "blockView";
      this.msg ="Please check the checkbox of terms and conditions";
    }
    
  }
  close(){
    this.imageModal = "noneView";
    this.audioModal = "noneView";
    this.msgModal1 = "noneView";
    this.darkShadow = "noneView";
    this.collectIdModal = "noneView";
  }
// -------------------------------For Popups---------------------------------------

processFile(imageInput: any) {
  const file: File = imageInput.files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', (event: any) => {
    this.selectedFile = new ImageSnippet(event.target.result, file);
    this.base64 = event.target.result;
  });
  this.form.get('avatar').setValue(file);
  reader.readAsDataURL(file);
}

termsCheck(e){
    if(e.checked){
      this.termsChecker=true;
      console.log(e.checked);
    }
  }
  emailChecker(){
    this.apiService.email = this.email;
  }
  
}
// ------------------------------------------------Timer------------------------------------------------------



