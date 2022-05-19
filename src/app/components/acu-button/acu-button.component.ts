import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acu-button',
  templateUrl: './acu-button.component.html',
  styleUrls: ['./acu-button.component.scss']
})
export class AcuButtonComponent implements OnInit {

  @Input() label: string;

  @Input() icon: string;

  @Input() appearance: 'outline' | 'fill' | 'icon' | 'text' = 'fill';

  @Input() color: 'primary' | 'accent' | 'basic' | 'link' | 'success' | 'warn' | 'text' = 'primary';

  @Input() disabled: boolean = false;

  @Input() loading: boolean = false;

  @Input() isNavigationButton: boolean = false;

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
