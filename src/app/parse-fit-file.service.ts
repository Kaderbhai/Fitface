import { Injectable } from '@angular/core';
import * as EasyFit from 'easy-fit';
import * as buffer from 'buffer';

@Injectable()
export class ParseFitFileService {

  constructor() {
  }

  parse(file: File): Promise<any> {
    let Buffer = buffer.Buffer;
    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = function() {
        console.dir(reader);
        let readerResult = reader.result;
        let bufferFile = new Buffer(readerResult);
  
        let easyFit = new EasyFit.default({
          force: true,
          speedUnit: 'km/h',
          lengthUnit: 'km',
          temperatureUnit: 'kelvin',
          elapsedRecordField: true,
          mode: 'cascade'
        });

        easyFit.parse(bufferFile, function (error, data) {
          // Handle result of parse method 
          if (error) {
            resolve(error)
          } else {
            resolve(data);
          }
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
