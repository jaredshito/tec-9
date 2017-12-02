import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db'
import{ AuthProvider } from '../../providers/auth/auth'
import { HomePage } from '../home/home';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  Usuario = {id:'',nombreUsuario : '',primerNombre : '', apellido : '',email : ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
            private dbFirebase : FirebaseDbProvider,
          public afDb: AngularFireDatabase, 
        public auth : AuthProvider
      ) {
        this.Usuario = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

  

  guardar(){
    let Usuario = {
      id : this.Usuario.id,
      nombreUsuario : this.Usuario.nombreUsuario,
      primerNombre : this.Usuario.primerNombre,
      apellido : this.Usuario.apellido,
      email : firebase.auth().currentUser.email,
      
      
      

    }  
    
  this.dbFirebase.guardarUsuario(Usuario).then(res=>{
  console.log('usuario guardado exitosamente:');
  this.navCtrl.setRoot(HomePage);
  
})
}





}
