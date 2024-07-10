import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export enum ConnectionStatus {
  Online = "Online",
  Offline = "Offline",
  All = "All"
}

export enum PartnerStatus {
  Loozend = "Loozend",
  Integrator = "Integrator",
  Whitebrand = "Whitebrand",
  All = "All"
}

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-filters.component.html',
  styleUrl: './user-filters.component.css'
})


export class UserFiltersComponent implements OnInit {

  filtersForm = new FormGroup({
    freeText:     new FormControl<string>('', ),
    hasDrivesUploading:  new FormControl<boolean>(false,  ),
    hasDrivesProcessingUpload:  new FormControl<boolean>(false,  ),
    hasDrivesBrowsable:  new FormControl<boolean>(false,  ),
    partner:  new FormControl<string>('',  ),
    showDeleted:  new FormControl<boolean>(false,  ),
    showFromLoozend:  new FormControl<boolean>(false,  ),
    showFromIntegrators:  new FormControl<boolean>(false,  ),
    showFromWhitebrand:  new FormControl<boolean>(false,  ),
    connectionStatus:  new FormControl<number>(0,  ),
    partnerStatus:  new FormControl<number>(0,  ),
  });

  // filtersForm!: FormGroup;

  // Opcional: Emitir los filtros aplicados para ser utilizados por un componente padre
  @Output() filtersApplied = new EventEmitter<any>();

  connectionStatusOptions = Object.values(ConnectionStatus);
  partnerStatusOptions = Object.values(PartnerStatus) ;



  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializa el formulario con valores por defecto o vacíos
    // this.filtersForm = this.fb.group({
    //   freeText: [''],
    //   partner: [''],
    //   hasDrivesUploading: [false],
    //   // ... otros campos de filtro
    //   connectionStatus: ['all'], // Asegúrate de que 'all' sea uno de los valores en tu select
    //   partnerStatus: ['all']
    // });
  }

  applyFilters(): void {
    // Emitir los valores del formulario cuando se apliquen los filtros
    console.log(this.filtersForm.value);
    this.filtersApplied.emit(this.filtersForm?.value);
  }
}
