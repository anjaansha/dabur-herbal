import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://projects.rayqube.com/Dabur_ComeInEarth";
  email:any;
  constructor(private http: HttpClient) { }
  getApi(apiURL) {
    return this.http.get(this.baseUrl + apiURL);
  }

  postApi(apiURL, data) {
    return (this.http.post(this.baseUrl + apiURL, data));
  }
}
