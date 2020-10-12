import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food';

  ngOnInit(): void {
    let heigth = document.getElementById("header").offsetHeight;
    document.getElementById("espacoHeader").style.height= (heigth-40)+"px";
    
  }

}
