import {AuthService} from './authentication/auth.service';
import {HttpClientService} from './http-client.service';
import {CarService} from './car/car.service';
import {CommentService} from './comment/comment.service';
import {HomeService} from './home/home.service';
import {OrderService} from './order/order.service';

export const allServices = [
  HttpClientService,
  AuthService,
  CarService,
  CommentService,
  HomeService,
  OrderService
];
