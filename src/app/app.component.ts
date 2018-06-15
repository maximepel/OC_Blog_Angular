import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',                 // Nom de la balise HTML dans le index
  templateUrl: './app.component.html',  // Chemin vers HTML à injecter
  styleUrls: ['./app.component.scss']   // Les chemins des feuilles de style
})

export class AppComponent {
  constructor() {
          const config = {
              apiKey: 'AIzaSyAvtFDdjt7mz_Lp5V6rjQ-WPeBI4Kkqn3g',
              authDomain: 'posts-demo-130dc.firebaseapp.com',
              databaseURL: 'https://posts-demo-130dc.firebaseio.com',
              projectId: 'posts-demo-130dc',
              storageBucket: 'posts-demo-130dc.appspot.com',
              messagingSenderId: '343967608231'
          };
      firebase.initializeApp(config);
  }
}
