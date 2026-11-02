import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.page.html',
  styleUrls: ['./devs.page.scss'],
})
export class DevsPage implements OnInit {

  devs = [
    {
      nome: 'Edmilson Toledo',
      matricula: '23100593',
      foto: '/assets/edmilson.png',
      
    },
    {
      nome: 'Ingrid Braga',
      matricula: '23100128',
      foto: '/assets/ingrid.png',
      
    },
    {
      nome: 'Camila Landy',
      matricula: '23101194',
      foto: '/assets/camila.png',
      
    },
    {
      nome: 'Gabriel Vasconcellos',
      matricula: '23101194',
      foto: '/assets/gabriel.png',
      
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
