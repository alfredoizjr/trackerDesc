import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  users: Observable<any[]>;

  constructor(public afDb: AngularFirestore) { 
    this.users = this.afDb.collection('user').valueChanges();
  }
}
