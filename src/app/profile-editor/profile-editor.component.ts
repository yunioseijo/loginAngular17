import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export default class ProfileEditorComponent implements OnInit {
  
  profileForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.minLength(3),Validators.required ]),
    lastName: new FormControl<string>('', [Validators.minLength(3), Validators.required]),
  })

  ngOnInit(): void {}
  onSubmit() {
    // TODO: Use EventEmitter with form value
    const { firstName, lastName } = this.profileForm.value;
    console.warn(firstName,lastName);
  }
}