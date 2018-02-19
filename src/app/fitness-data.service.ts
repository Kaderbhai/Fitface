import { Injectable } from '@angular/core';

// The format for stored fitness data
interface FitnessData {
  name: string;
  type: string;
  data: object;
}

/**
 * A service for storing and retrieving fitness data
 */
@Injectable()
export class FitnessDataService {
  fitnessData: FitnessData = null;

  constructor() { }

  storeFitnessData(fitnessData: FitnessData) {
    this.fitnessData = fitnessData;
  }

  getDataName(): string {
    return this.hasFitnessData() ? this.fitnessData.name : null;
  }

  getDataType(): string {
    return this.hasFitnessData() ? this.fitnessData.type : null;
  }

  getFitnessData(): object {
    return this.fitnessData;
  }

  hasFitnessData(): boolean {
    return !!this.fitnessData;
  }

  clearFitnessData() {
    this.fitnessData = null;
  }
}
