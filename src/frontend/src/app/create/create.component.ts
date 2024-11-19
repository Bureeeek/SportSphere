import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      author: this.fb.group({
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        verified: [false],
        email: ['', [Validators.required, Validators.email]]
      }),
      publicationDate: ['', Validators.required],
      lastUpdated: ['', Validators.required],
      category: ['', Validators.required],
      tags: this.fb.array([]),
      summary: ['', Validators.required],
      content: this.fb.group({
        body: ['', Validators.required],
        media: this.fb.array([])
      }),
      commentsEnabled: [true],
      readTime: [0]
    });
  }

  addTag(tag: string) {
    const tags = this.postForm.get('tags') as FormArray;
    tags.push(this.fb.control(tag));
  }

  addMedia(mediaType: string, mediaUrl: string, caption: string) {
    const media = this.postForm.get('content.media') as FormArray;
    media.push(this.fb.group({
      type: [mediaType],
      url: [mediaUrl],
      caption: [caption]
    }));
  }

  onSubmit() {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      // Here you would typically send the data to your backend
    }
  }
}