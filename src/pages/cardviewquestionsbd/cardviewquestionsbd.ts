import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,App } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import { CardviewmyquestionsPage } from '../cardviewmyquestions/cardviewmyquestions';



@IonicPage()
@Component({
  selector: 'page-cardviewquestionsbd',
  templateUrl: 'cardviewquestionsbd.html',
})
export class CardviewquestionsbdPage {
  Question = { id : "" };
  Comentario = {Usuario : "", Coment : "", id: "" };
  cards = {Encabezado: "", Materia: "", Pregunta: "", id: "",UserNombre:"",userId:""};
  Titulo = this.navParams.get("cardEncabezado");
  idUser = firebase.auth().currentUser.uid;
  Komentario = [];
  nombreDeUsuario = "";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private dbFirebase : FirebaseDbProvider,
    public afDb: AngularFireDatabase, 
  public auth : AuthProvider,
public modalCtrl : ModalController,
public appCtrl : App) {

    this.ObtenerPregunta();
    this.MostrarComentario();
    this.obtenerUsuario();
    console.log("constr");
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
            //console.log(datoQuestion);
            for(var j in datoQuestion){
              if(datoQuestion[j].Encabezado == this.Titulo){
              //console.log(datoQuestion[j]);
              
                    this.cards.Encabezado = datoQuestion[j].Encabezado;
                    this.cards.Materia = datoQuestion[j].Materia;
                    this.cards.Pregunta = datoQuestion[j].Pregunta;
                    this.cards.id = datoQuestion[j].id;
                    this.cards.UserNombre = datoQuestion[j].Usuario;
                    this.cards.userId = datoQuestion[j].UsuarioId;
              }
            }
          
        }
      }
    });

  }

  MostrarComentario(){
    //console.log("mostrar comentarios!!!");
    firebase.database().ref('Question/').on('value', data => {
      if(data.val() != null){
        var datos = data.val();
        var keys = Object.keys(datos)
  
        for(var i = 0; i < keys.length; i++) {
          var k = keys[i];
          for(var i = 0; i < keys.length; i++) {
            var k = keys[i];
            
            var datoQuestion = datos[k];
            //console.log(datoQuestion);
            for(var j in datoQuestion){
              if(datoQuestion[j].Encabezado == this.Titulo){
                //console.log(datoQuestion[j]);
                var dato = datoQuestion[j];
                for(var z in dato){    

                  if(dato[z].Usuario != null){
                    this.Komentario.push({
                      Usuario : dato[z].Usuario,
                      com : dato[z].Comentario
                    });
                }

               }               
            
                }
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
obtenerUsuario(){
  firebase.database().ref('Usuario/'+firebase.auth().currentUser.uid).on('value', data =>{
    if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)
  
      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        
          var datoQuestion = datos[k];
          if(datoQuestion.nombreUsuario){
            console.log(datoQuestion.nombreUsuario);
            this.nombreDeUsuario = datoQuestion.nombreUsuario;
          }
      }
    }
  });
}

Comentar(){

  let Comentario = {
    usuarioId : firebase.auth().currentUser.uid,
    Usuario : this.nombreDeUsuario,
    Comentario : this.Comentario.Coment,
    id : Date.now()
    
  }  
  let Question = {
    id : this.cards.id
  }
  
  
  firebase.database().ref('Question/'+this.cards.userId+'/'+Question.id+'/'+Comentario.id).set(Comentario);
  this.Komentario = [];
  this.MostrarComentario(); 
  //console.log(Comentario);
  //console.log(Question);
  //console.log("perfecto we si se inserto");
  this.Comentario.Coment = "";

}



}
