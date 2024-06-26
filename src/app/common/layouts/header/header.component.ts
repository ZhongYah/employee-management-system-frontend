import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleCollapsed = new EventEmitter<void>();
  isCollapsed = false;
}
