import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BackgroundComponent } from './pages/background/background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    NavbarComponent, 
    BackgroundComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portfolio';
}
