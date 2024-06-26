import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-datePicker',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './datePicker.component.html',
  styleUrl: './datePicker.component.scss',
})
export class DatePickerComponent {}
