import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  public showContent = signal(false);

  public toggleContent (){
    console.log('mostrar opciones de avatar');
    this.showContent.update(value => !value);
  }

}
