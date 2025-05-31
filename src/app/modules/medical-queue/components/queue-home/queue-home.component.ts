import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-queue-home',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './queue-home.component.html',
  styleUrl: './queue-home.component.scss',
  standalone:true
})
export class QueueHomeComponent implements OnInit{

  queData:any;



  ngOnInit(): void {

    this.queData = [
      {petAvatar:'https://www.petcratesdirect.com/cdn/shop/articles/siberian-husky_1024x1024.jpg?v=1502391918', ownerNmae:'Ashen Manilka', petType:'Dog',PetName:'Broono' ,queNo:'01', isNext:true},
      {petAvatar:'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg', ownerNmae:'Chamath Devinda', petType:'Cat',PetName:'Garfiled',queNo:'02',isNext:false},
      {petAvatar:'', ownerNmae:'Chathuranga Bandara', petType:'Cat',PetName:'xxxxxx',queNo:'03',isNext:false},
      {petAvatar:'', ownerNmae:'Hasika Sandaruwan', petType:'Cat',PetName:'xxxxxx',queNo:'04',isNext:false},
      {petAvatar:'', ownerNmae:'Charith Bannaheka', petType:'Cat',PetName:'xxxxxx',queNo:'05',isNext:false},
      {petAvatar:'', ownerNmae:'Chamara Rnawaka', petType:'Cat',PetName:'xxxxxx',queNo:'06',isNext:false},
    ]
  }

}
