import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizView = "noneView";
  startView = "blockView";
  quiz:any;
  question:any;
  options:any;
  questionId:any;
  count:any=0;
  optionsToSend = [];
  email:any;
  constructor(private apiService: ApiService, public http: HttpClient, private router: Router) {
    this.email =this.apiService.email;
    console.log(this.email);
   }

  ngOnInit() {
  }
  begin(){
    this.apiService.getApi('/api/quiz').subscribe(data => {
      const jsonData = JSON.parse(JSON.stringify(data));
      console.log(jsonData);
      if (jsonData.STATUS === 'SUCCESS' ){
        this.quiz = jsonData.data.questions;
        console.log(this.quiz.length);
        this.question = this.quiz[0].question;
        this.questionId = this.quiz[0].question_id;
        this.options = this.quiz[0].options;
      }
    });

    

    this.quizView = "blockView";
    this.startView = "noneView";
  }
  quizbegin(id){
    this.optionsToSend.push({question_id:this.questionId, option_id:id})
    console.log(this.optionsToSend);
    this.count++;
    console.log(this.count);
    if(this.quiz.length>this.count){
      this.question = this.quiz[this.count].question;
      this.options = this.quiz[this.count].options;
      this.questionId = this.quiz[this.count].question_id;
    }else{
      const answers = {
        submissions: this.optionsToSend
      };
      const submission = new FormData();
      submission.append('EmailId', this.email);

      submission.append('submissions', JSON.stringify(answers));
      this.apiService.postApi('/api/quiz/submit', submission).subscribe(data => {
        const dataJson = JSON.parse(JSON.stringify(data));
        console.log(dataJson);
        if (dataJson.STATUS === 'SUCCESS'){
          Swal.fire({
            title: 'Thank You!',
            text: 'Your quiz has been submitted.',
            type: 'success',
            confirmButtonText: 'Okay',
          }).then(() => {
            this.router.navigate(['home']);
          });
        }else{
          Swal.fire({
            title: 'Sorry',
            text: dataJson.MESSAGE,
            type: 'success',
            confirmButtonText: 'Okay',
          }).then(() => {
            this.router.navigate(['home']);
          });
        }
      });
      
      
    }
    
  }
}
