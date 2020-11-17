import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonHelperService {

  constructor() { }

  public mapReplacer(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
      return {
        value: Array.from(originalObject.entries())
      };
    } else {
      return value;
    }
  }
}
