import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  card = {nombreDeUsuario : "", PrimerNombre : "", apellido :""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider,
  public viewCtrl : ViewController) {

    this.obtenerUsuario();
    console.log(this.card);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }
  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
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
              
              this.card.nombreDeUsuario = datoQuestion.nombreUsuario;
              this.card.apellido = datoQuestion.apellido;
              this.card.PrimerNombre = datoQuestion.primerNombre;
            }
        }
      }
    });
  }
  closeModal() {
    this.navCtrl.setRoot(HomePage);
}

}
