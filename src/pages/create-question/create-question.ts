import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import firebase from 'firebase';

/**
 * Generated class for the CreateQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-question',
  templateUrl: 'create-question.html',
})
export class CreateQuestionPage {
  Question = {id:'',Materia:'',Encabezado:'', Pregunta:'', Usuario:''}
  UserNombre = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dbFirebase : FirebaseDbProvider,
  public afDb: AngularFireDatabase, 
public auth : AuthProvider
) {
this.Question = this.navParams.data;
firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
  if(data.val() != null){
    var datos = data.val();
    var keys = Object.keys(datos)

    for(var i = 0; i < keys.length; i++) {
      var k = keys[i];
      
        var datoQuestion = datos[k];
        if(datoQuestion.nombreUsuario){
          console.log(datoQuestion.nombreUsuario);
          this.UserNombre = datoQuestion.nombreUsuario;
        }
    }
  }
});
console.log(this.UserNombre);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuestionPage');
  }
  

  guardar(){
    let Question = {
      id : this.Question.id,
      Usuario :  this.UserNombre,
      Materia : this.Question.Materia,
      Encabezado : this.Question.Encabezado,
      Pregunta : this.Question.Pregunta,
      UsuarioId : firebase.auth().currentUser.uid
      
      

    }  
    
  this.dbFirebase.guardarPregunta(Question).then(res=>{
  console.log('Pregunta Realizada con exito:');
  this.navCtrl.setRoot(HomePage);
  
})
}




}
