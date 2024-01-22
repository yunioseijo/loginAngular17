import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ysm-forms-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = 'Click me'; // Texto del botón
  @Input() icon: string | undefined; // Para el ícono
  @Input() customClasses: string | undefined; // Para clases personalizadas
  @Output() nombreOuput1 = new EventEmitter<Event>();

  nombreMetodoEvento(event: Event): void {
    this.nombreOuput1.emit(event); // Emitir el evento al hacer clic
  }

  get buttonClasses(): string {
    console.log('compruebo las clases', this.customClasses);
    if (this.customClasses?.includes('no-class')) {
      // Elimina 'no-class' de la cadena y retorna el resto de las clases
      console.log('Despues de quitar las clases',this.customClasses.substring(8).trim());
      return this.customClasses.substring(8).trim();
    }
    // Concatena las clases por defecto con las personalizadas (si existen)
    return `inline-block px-6 py-2 text-xs font-medium leading-6 text-center uppercase transition  ripple 
    hover:shadow hover:bg-gray-200 hover:text-black focus:outline-none ${this.customClasses || ''}`;
  }
}
