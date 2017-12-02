import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import { CreateQuestionPage } from '../create-question/create-question';
import { BdquestionsPage } from '../bdquestions/bdquestions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {}

  /**
   * Calls the authentication provider and logs the user out, on successful logout it sends the user
   * back to the login page.
   */
  

  makeQuestion(){
    this.navCtrl.push(CreateQuestionPage);
  }
  BdQuestion(Materia: String){
    console.log(Materia);
    this.navCtrl.push(BdquestionsPage, {materia : Materia});
  }

}
