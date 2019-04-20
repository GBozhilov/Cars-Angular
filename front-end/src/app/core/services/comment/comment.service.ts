import {Injectable} from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {Subscribable} from 'rxjs';
import {Subject} from 'rxjs';

@Injectable()
export class CommentService {
  public comments = new Subject<any>();

  constructor(
    private httpService: HttpClientService,
  ) {
  }

  addComment(body): Subscribable<Object> {
    let userId = sessionStorage.getItem('id');
    return this.httpService.post('comment/create/' + userId, body, true);
  }

  getComments(id): void {
    return this.loadComments(id);
  }

  deleteComment(id) {
    let userId = sessionStorage.getItem('id');
    return this.httpService.get('comment/delete/' + id + '/' + userId, true);
  }

  loadComments(id) {
    this.httpService.get('comment/all/' + id, false).subscribe(res => {
      this.comments.next(res.comments);
    })
  }
}
