import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { DriveDto } from '../../../PruebasApi';
import { BytePipe } from "../../../Pipes/byte.pipe";

@Component({
  selector: 'app-drive-details',
  standalone: true,
  imports: [
    CommonModule,
    BytePipe
],
  templateUrl: './drive-details.component.html',
  styleUrl: './drive-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveDetailsComponent implements OnInit {
  @Input() drive: DriveDto = {} as DriveDto;

  ngOnInit(): void { }

}
