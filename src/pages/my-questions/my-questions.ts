import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { CardviewmyquestionsPage } from '../cardviewmyquestions/cardviewmyquestions';
import { HomePage } from '../home/home';
import {CreateQuestionPage} from '../create-question/create-question'
import { CardviewquestionsbdPage } from '../cardviewquestionsbd/cardviewquestionsbd';



@IonicPage()
@Component({
  selector: 'page-my-questions',
  templateUrl: 'my-questions.html',
})
export class MyQuestionsPage {
  cards = [];
  id = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {

      firebase.database().ref('Question/').on('value', data => {
        if(data.val() != null){
          var datos = data.val();
          var keys = Object.keys(datos)
    
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if(keys[i]== this.id){
              var datoQuestion = datos[k];
              
              for(var j in datoQuestion){
                console.log(datoQuestion[j]);
                
                  this.cards.push(
                    {
                      Encabezado : datoQuestion[j].Encabezado,
                      Materia : datoQuestion[j].Materia,
                      Pregunta : datoQuestion[j].Pregunta,
                      id : datoQuestion[j].id
                    }
                  );
                
              }
            }
          }
        }
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyQuestionsPage');
  }
  viewCard(Encabezado : string){
    let cardview = this.modalCtrl.create(CardviewquestionsbdPage, {cardEncabezado: Encabezado});
    cardview.present();
  }
  closeModal() {
    this.navCtrl.setRoot(HomePage);
}
makeQuestion(){
  this.navCtrl.push(CreateQuestionPage);

}
}
