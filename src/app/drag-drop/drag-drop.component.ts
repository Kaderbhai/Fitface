import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.sass']
})
export class DragDropComponent implements OnInit {

  filetypes: string[] = ['.fit', '.csv'];

  constructor() { }

  ngOnInit() {
  }

}
