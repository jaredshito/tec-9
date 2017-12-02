import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController,ViewController } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-cardviewmyquestions',
  templateUrl: 'cardviewmyquestions.html',
})
export class CardviewmyquestionsPage {
  cards = {Encabezado: "", Materia: "", Pregunta: "", id: ""};
 Titulo = this.navParams.get("cardEncabezado");
 id = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    //console.log(this.navParams.get("cardEncabezado"));
    firebase.database().ref('Question/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if(keys[i]== this.id){
            var datoQuestion = datos[k];
            console.log(datoQuestion);
            for(var j in datoQuestion){
              if(datoQuestion[j].Encabezado == this.Titulo){
              console.log(datoQuestion[j]);
              
                this.cards.Encabezado = datoQuestion[j].Encabezado;
                    this.cards.Materia = datoQuestion[j].Materia;
                    this.cards.Pregunta = datoQuestion[j].Pregunta,
                    this.cards.id = datoQuestion[j].id
              }
            }
          }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardviewmyquestionsPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
}

}
