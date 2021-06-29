import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  datos:any= JSON.parse(localStorage.getItem('hospital'));;
  constructor() { }

  ngOnInit(): void {
    
  }
  deslog(){
      localStorage.removeItem('hospital');
      
  }

}
