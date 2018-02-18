import { Component, OnInit } from '@angular/core';
import { ParseFitFileService } from '../parse-fit-file.service';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.sass']
})
export class DragDropComponent implements OnInit {

  filetypes: string[] = ['.fit', '.csv'];

  constructor(private parseFitFileService: ParseFitFileService) { }

  ngOnInit() {
  }

  getFileFromDrop(dataTransfer: DataTransfer): File {
    if (dataTransfer.items) {
      // If dropped items aren't files, reject them
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < dataTransfer.items.length; i++) {
        if (dataTransfer.items[i].kind == "file") {
          return dataTransfer.items[i].getAsFile();
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      return dataTransfer.files[0];
    }
  }

  dragoverHandler($event: any) {
    $event.preventDefault();
  }

  dropHandler($event: any) {
    $event.preventDefault();

    let file: File = this.getFileFromDrop($event.dataTransfer);
    console.log("file name is " + file.name);

    this.parseFitFileService.parse(file)
      .then(function(parsedFile: any) {
        console.log('logging parsed data');
        console.dir(parsedFile);
      });
  }

}
