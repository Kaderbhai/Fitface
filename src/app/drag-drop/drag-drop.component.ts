import { Component, OnInit } from '@angular/core';
import { ParseFitFileService } from '../parse-fit-file.service';
import { FitnessDataService } from '../fitness-data.service';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.sass']
})
export class DragDropComponent implements OnInit {

  supportedFileTypes: string[] = ['.fit'];
  fileName: string = null;

  constructor(
    private parseFitFileService: ParseFitFileService,
    private fitnessDataService: FitnessDataService
  ) { }

  ngOnInit() {
  }

  getFileFromDrop(dataTransfer: DataTransfer): File {
    let file: File = null;

    if (dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (dataTransfer.items[i].kind == "file") {
          file = dataTransfer.items[i].getAsFile();
          break;
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      if(dataTransfer.files.length > 0) {
        file = dataTransfer.files[0];
      }
    }

    return file;
  }

  // Get the file type if it matches one of our supported types.
  // Return null if the type is not matched
  getFileType(file: File): string {
    let fileType: string = null;

    this.supportedFileTypes.forEach(type => {
      if(file.name.indexOf(type) > -1) {
        fileType = type;
      }
    });

    return fileType;
  }

  // In order to upload files with drag and drop we need to
  // stop the browser's default behaviour for dragging over the input box
  dragoverHandler($event: any) {
    if(!this.fitnessDataService.hasFitnessData()) {
      $event.preventDefault();
    }
  }

  // Handle the drop event to get the uploaded file
  dropHandler($event: any) {
    if(!this.fitnessDataService.hasFitnessData()) {
      $event.preventDefault();

      let file: File = this.getFileFromDrop($event.dataTransfer);

      // Only process the file if it exists
      if(file) {
        let fileType = this.getFileType(file);
        // Only process the file if it is a supported type
        if(fileType) {
          // Parse the file
          this.parseFitFileService.parse(file)
          .then((parsedData: object) => {
            // Store the parsed data
            this.fitnessDataService.storeFitnessData({
              name: file.name,
              type: fileType,
              data: parsedData
            });
          });
        }
      }
    }    
  }

  getContainerMessage() {
    return this.fitnessDataService.hasFitnessData() ? 'Current file: ' + this.fitnessDataService.getDataName() : 'Drag your ' + this.supportedFileTypes.join(', ') + ' files here to upload for analysis';
  }

}
