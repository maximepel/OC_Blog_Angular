import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: any[];
    postSubscription: Subscription;

    constructor(private postService: PostService) {}

    ngOnInit() {
      this.postSubscription = this.postService.postsSubject.subscribe(
          (posts: any[]) => {
              this.posts = posts;
          }
      );
      this.postService.getPosts();
      this.postService.emitPosts();
    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
    }
}
