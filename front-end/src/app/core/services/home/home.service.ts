import {Injectable} from '@angular/core';
import {HttpClientService} from '../http-client.service';

@Injectable()
export class HomeService {
  constructor(private httpService: HttpClientService) {
  }
}
