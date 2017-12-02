import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import {CreateQuestionPage} from '../create-question/create-question'
import { CardviewquestionsbdPage } from '../cardviewquestionsbd/cardviewquestionsbd';
import {CardviewmyquestionsPage} from '../cardviewmyquestions/cardviewmyquestions';
import {HomePage} from '../home/home';

/**
 * Generated class for the BdquestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bdquestions',
  templateUrl: 'bdquestions.html',
})
export class BdquestionsPage {
  cards = [];
  id = firebase.auth().currentUser.uid;
  Titulo = '';
  Encabezado='';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {
      
      this.Titulo = this.navParams.get("materia");
      this.Encabezado=this.Titulo;
      console.log(this.Titulo);
      firebase.database().ref('Question/').on('value', data => {
        if(data.val() != null){
          var datos = data.val();
          var keys = Object.keys(datos)
    
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if(keys[i]== this.id){
              var datoQuestion = datos[k];
              
              for(var j in datoQuestion){
                console.log(datoQuestion[j].Materia);
                if ( datoQuestion[j].Materia == this.Titulo){
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
        }
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyQuestionsPage');
  }
  viewCard(Encabezado : string){
    let cardview = this.modalCtrl.create(CardviewmyquestionsPage, {cardEncabezado: Encabezado});
    cardview.present();
  }
  closeModal() {
    this.navCtrl.setRoot(HomePage);
}
makeQuestion(){
  this.navCtrl.push(CreateQuestionPage);

}
}
