import { Injectable } from '@angular/core';
import * as EasyFit from 'easy-fit';
import * as buffer from 'buffer';

/**
 * A service for taking File objects created from .fit files and returning parsed fitness data as an object
 */
@Injectable()
export class ParseFitFileService {

  constructor() {
  }

  // Parse an uploaded File using the easy-fit package
  parse(file: File): Promise<any> {

    // FileReader is needed to get binary data from the uploaded file object
    let reader = new FileReader();

    // Buffer is needed to transform the FileReader binary data into a form that
    // easy-fit can deal with
    let Buffer = buffer.Buffer;

    // Initialise the easy-fit library with some config to use when parsing files
    let easyFit = new EasyFit.default({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'km',
      temperatureUnit: 'kelvin',
      elapsedRecordField: true,
      mode: 'cascade'
    });

    return new Promise((resolve, reject) => {

      // The file reader is asynchronous, so we register a function
      // that will be called when it has finished working with the File
      reader.onload = function() {
        let readerResult = reader.result;
        let bufferFile = new Buffer(readerResult);

        easyFit.parse(bufferFile, function (error, data) {
          // Handle result of parse method 
          if (error) {
            reject(error)
          } else {
            resolve(data);
          }
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
