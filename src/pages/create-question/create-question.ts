import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';

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
  Question = {id:'',Materia:'',Encabezado:'', Pregunta:'' }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dbFirebase : FirebaseDbProvider,
  public afDb: AngularFireDatabase, 
public auth : AuthProvider
) {
this.Question = this.navParams.data;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuestionPage');
  }

  guardar(){
    let Question = {
      id : this.Question.id,
      Materia : this.Question.Materia,
      Encabezado : this.Question.Encabezado,
      Pregunta : this.Question.Pregunta,
      
      

    }  
    
  this.dbFirebase.guardarPregunta(Question).then(res=>{
  console.log('Pregunta Realizada con exito:');
  this.navCtrl.setRoot(HomePage);
  
})
}




}
