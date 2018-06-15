import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Post} from '../models/Post.model';
import * as firebase from 'firebase';

@Injectable()
export class PostService {

    postsSubject = new Subject<Post[]>();

    private posts: Post[] = [];

    idMaxCharger() {
        return this.posts.length;
    }

    emitPosts() {
        this.postsSubject.next(this.posts.slice());
    }

    savePosts() {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/posts').set(this.posts).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
         );
    }

    getPosts() {
        firebase.database().ref('/posts')
            .on('value', (data) => {
                this.posts = data.val() ? data.val() : [];
                this.emitPosts();
            });
    }

    createPost(newPost: Post) {

        return new Promise(
            (resolve, reject) => {
                this.posts.push(newPost);
                this.savePosts().then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
                this.emitPosts();
            }
        );
    }

    removePost(post: Post) {
        const postRemove = this.posts.findIndex(
            (postEl) => {
                if (postEl === post) {
                    return true;
                }
            }
        );
        this.posts.splice(postRemove, 1);
        this.savePosts();
        this.emitPosts();
    }

    onAdore(index: number) {
        this.posts[index].loveIts++;
    }

    onDeteste(index: number) {
        this.posts[index].loveIts--;
    }
}
