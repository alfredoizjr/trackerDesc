import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { User } from './interfaces/user.interfaces';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number;
  lng: number;
  users: User[] = [];
  followedTo: string = null;
  followedName: string = null;
  init = false;

  constructor(public _userService: UsersService) {

    _userService.users.subscribe((data:User[]) => {

         this.users = data;

         if(!this.init) {
           this.lat = data[0].lat;
           this.lng = data[0].lng;
           this.init = true;
         }

         if (this.followedTo) {

            data.forEach( drivers => {

              if( drivers.key === this.followedTo ) {
                this.lat = drivers.lat;
                this.lng = drivers.lng;
              }

            });
         }
      });

      
  }

  followedDriver(driver:User) {
    this.followedName = driver.name;
    this.followedTo = driver.key;

    this.lat = driver.lat;
    this.lng = driver.lng;
  }

  unFollowed() {
    this.followedName = null;
    this.followedTo = null;
  }
}
