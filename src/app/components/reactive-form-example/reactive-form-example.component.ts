import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  template: `
    <label for="name">Name: </label>
    <input id="name" type="text" [formControl]="name">
    <p>Value: {{ name.value }}</p>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
 
  styleUrl: './reactive-form-example.component.css'
})
export class ReactiveFormExampleComponent {
  name = new FormControl('');

}
