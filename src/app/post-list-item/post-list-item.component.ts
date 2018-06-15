import { Component, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})

export class PostListItemComponent {

    @Input() postsTitle: string;
    @Input() postsContent: string;
    @Input() postsLoveIts: number;
    @Input() postsCreateAt: string;
    @Input() postsIndex: number;
    @Input() postsId: number;
    @Input() postIn: Post;

    constructor(private postService: PostService) {}

    onAime() {
        this.postService.onAdore(this.postsIndex) ;
    }

    onAimePas() {
        this.postService.onDeteste(this.postsIndex) ;
    }

    getColor() {
        if (this.postsLoveIts > 0) {
            return 'green';
        } else if (this.postsLoveIts < 0) {
            return 'red';
        }
    }

    onDeletePost(post: Post) {
        this.postService.removePost(post);
    }
}
