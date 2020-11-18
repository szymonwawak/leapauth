import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonHelperService {

  constructor() {
  }

  public replaceMapToObject(map) {
    const convMap = {};
    map.forEach((val, key) => {
      convMap[key] = val;
    });
    return convMap;
  }
}
