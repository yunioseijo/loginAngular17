import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { GetUserDetailsResponse } from '../../../PruebasApi';

@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css',

})
export class DetailsUserComponent implements OnInit {
  @Input() userDetails: GetUserDetailsResponse = {} as GetUserDetailsResponse;
  ngOnInit(): void { }

}
