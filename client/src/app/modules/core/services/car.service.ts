import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createCarUrl, editCarUrl, deleteCarUrl, getDetailsCarUrl, getAllCarUrl } from './database';
import ICar from '../interfaces/ICar';

@Injectable()
export class CarService {
  constructor(private http: HttpClient) { }
 
  create(data: Object) {
    return this.http.post(createCarUrl, data);
  }
  
  edit(data: Object, id: string) {
    return this.http.put(editCarUrl(id), data);
  }
  
  delete(id: string) {
    return this.http.delete(deleteCarUrl(id));
  }
  
  getDetails(id: string) {
    return this.http.get<ICar>(getDetailsCarUrl(id));
  }

  getAll() {
    return this.http.get<ICar[]>(getAllCarUrl);
  }
}