import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../models/Post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  // Property Binding sur le formulaire
  initForm() {
    this.postForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required]
    });
  }

  // Event Binding sur le submit du formulaire
  onSavePost() {
      const title = this.postForm.get('title').value;
      const content = this.postForm.get('content').value;
      const id: number = this.postService.idMaxCharger() ;
      const created_at = new Date().toString();
      const loveIts = 0;
      const newPost = new Post(title, id, content, loveIts, created_at);
      this.postService.createPost(newPost).then(
          () => {
              this.router.navigate(['/posts']);
          },
          (error) => {
              this.errorMessage = error;
          }
      );
  }
}
