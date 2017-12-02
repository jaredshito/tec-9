import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AdduserPage } from '../pages/adduser/adduser';
import { CreateQuestionPage } from '../pages/create-question/create-question';
import { MyQuestionsPage } from '../pages/my-questions/my-questions';
import { PerfilPage } from '../pages/perfil/perfil';
import { CardviewmyquestionsPage } from '../pages/cardviewmyquestions/cardviewmyquestions';
import { BdquestionsPage } from '../pages/bdquestions/bdquestions';
import { CardviewquestionsbdPage } from '../pages/cardviewquestionsbd/cardviewquestionsbd';

export const config = {
  apiKey: "AIzaSyAmsVrNKjv0EcvyvcvUkYS-GRUTfuiS00o",
  authDomain: "tec-9-3f33c.firebaseapp.com",
  databaseURL: "https://tec-9-3f33c.firebaseio.com",
  projectId: "tec-9-3f33c",
  storageBucket: "",
  messagingSenderId: "831005121547"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdduserPage,
    CreateQuestionPage,
    MyQuestionsPage,
    PerfilPage,
    CardviewmyquestionsPage,
    CardviewquestionsbdPage,
    BdquestionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdduserPage,
    CreateQuestionPage,
    MyQuestionsPage,
    PerfilPage,
    CardviewmyquestionsPage,
    CardviewquestionsbdPage,
    BdquestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
