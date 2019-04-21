import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CommentService} from '../../../core/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public text: string;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

  }

  post(e) {
    this.text = e.target[0].value;
    if (!this.text || !sessionStorage.getItem('authtoken')) {
      alert('Cannot post empty comment!');
      return;
    }
    this.route.params.subscribe(params => {
      let carId = params['id'];
      this.commentService.addComment({text: this.text, carId: carId}).subscribe(res => {
        this.commentService.loadComments(carId);
        e.target[0].value = '';
      })
    })
  }
}
