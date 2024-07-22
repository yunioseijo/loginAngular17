import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { GetUserComputersResponse } from '../../../PruebasApi';
import { AccordionModule } from 'primeng/accordion';
import { LimitToPipe } from '../../../Pipes/limitTo.pipe';
import { BytePipe } from '../../../Pipes/byte.pipe';

@Component({
  selector: 'computer-details',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    LimitToPipe,
    BytePipe,
  ],
  templateUrl: './computerDetails.component.html',
  styleUrl: './computerDetails.component.css',

})
export class ComputerDetailsComponent implements OnInit {


  @Input ()computerDetails: GetUserComputersResponse = {} as GetUserComputersResponse;

  ngOnInit(): void { }

}
