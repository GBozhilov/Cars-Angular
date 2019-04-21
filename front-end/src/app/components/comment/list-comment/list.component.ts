import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommentService} from '../../../core/services/comment/comment.service';
import {AuthService} from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CommentListComponent implements OnInit {
  public comments: Object[];

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.commentService.getComments(p.id);
      this.commentService.comments.subscribe(c => {
        this.comments = c;
      })
    })
  }

  delComment(id) {
    this.commentService.deleteComment(id).subscribe(res => {
      this.comments[0] && this.commentService.loadComments(this.comments[0]['car']);
    })
  }
}
