import { Component, OnInit } from '@angular/core';

// const firebase = require('firebase/app');
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Instagram Clone';

  ngOnInit(): void {

    // *TODO Initialize Firebase with atributes (EYMS)
    const config = {
      apiKey: "AIzaSyBpzR4eYdym9NGxaQysYF5nfk6Kc2BH9iw",
      authDomain: "jta-instagram-clone-d8131.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-d8131.firebaseio.com",
      projectId: "jta-instagram-clone-d8131",
      storageBucket: "jta-instagram-clone-d8131.appspot.com",
      messagingSenderId: "801942607509",
      appId: "1:801942607509:web:8ff43ff501a8b842"
    };

    firebase.initializeApp(config);

  }
}
