import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';

/**
 * Generated class for the CardviewquestionsbdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardviewquestionsbd',
  templateUrl: 'cardviewquestionsbd.html',
})
export class CardviewquestionsbdPage {
  Question = { id : "" };
  Comentario = {Usuario : "", Coment : "", id: "" };
  cards = {Encabezado: "", Materia: "", Pregunta: "", id: ""};
  Titulo = this.navParams.get("cardEncabezado");
  idUser = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private dbFirebase : FirebaseDbProvider,
    public afDb: AngularFireDatabase, 
  public auth : AuthProvider) {

    this.ObtenerPregunta();

    
  }
  ObtenerPregunta(){
    this.Comentario = this.navParams.data;
    //console.log(this.navParams.get("cardEncabezado"));
    firebase.database().ref('Question/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          
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
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardviewquestionsbdPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
}
Preguntar(){
  let Comentario = {
    Usuario : firebase.auth().currentUser.uid,
    Comentario : this.Comentario.Coment,
    id : Date.now()
    
  }  
  let Question = {
    id : this.cards.id
  }
  
  
  firebase.database().ref('Question/'+this.auth.getUser()+'/'+Question.id+'/'+Comentario.id).set(Comentario);
  this.navCtrl.setRoot(HomePage);
  console.log(Comentario);
  console.log(Question);

}



}
