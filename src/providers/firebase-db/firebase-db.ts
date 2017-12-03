import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import firebase from 'firebase';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  guardarUsuario(Usuario){
    Usuario.id  = Date.now();
    return this.afDB.database.ref('Usuario/'+this.auth.getUser()+'/'+Usuario.id).set(Usuario) 
 }

 guardarPregunta(Question){
   if(! Question.id){
     Question.id = Date.now();
  }
      return this.afDB.database.ref('Question/'+this.auth.getUser()+'/'+Question.id).set(Question) 
      }
  
      guardarComentario(Comentario,Question){
    if(! Comentario.id){
      Comentario.id = Date.now();  
    }
    firebase.database().ref('Question/'+this.auth.getUser()+'/'+Question.id+'/'+Comentario.id).set(Comentario);

  }
 }
