import { Component, OnInit } from '@angular/core';
import * as EasyFit from 'easy-fit';

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

  clickHandler() {
    console.log('woop');
  }

  parseFile(file: File) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    var readFile = reader.result;
    // Create a EasyFit instance (options argument is optional) 
    var easyFit = new EasyFit.default({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'km',
      temperatureUnit: 'kelvin',
      elapsedRecordField: true,
      mode: 'cascade'
    });
    
    // Parse your file 
    easyFit.parse(readFile, function (error, data) {
    
      // Handle result of parse method 
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(data));
      }
      
    });
  }

  dragoverHandler($event: any) {
    $event.preventDefault();
  }

  dropHandler($event: any) {
    $event.preventDefault();

    // If dropped items aren't files, reject them
    var dt = $event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          var f: File = dt.items[i].getAsFile();
          console.log("... file[" + i + "].name = " + f.name);
          console.dir(f);
          this.parseFile(f);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i=0; i < dt.files.length; i++) {
        console.log("... file[" + i + "].name = " + dt.files[i].name);
      }  
    }
  }

}
