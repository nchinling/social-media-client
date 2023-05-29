import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { Likes, LikesResponse, PostResponse } from '../models';
import { PhotoService } from '../photo.service';
import { UploadService } from '../upload.service';
// import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy{


  uploadSvc = inject(UploadService)
  photoSvc = inject(PhotoService)
  router = inject(Router)
  
  photoFile!:File
  photoDataUrl!: string
  postId!: string
  plusCount!: number
  minusCount!:number


  //contains postId, title and content 
  post$!: Observable<PostResponse>

  like$!: Promise<LikesResponse>

  //Subscription is used for manual subscription/unsubscription
  postSubscription!: Subscription

  ngOnInit(): void {
    this.post$ = this.uploadSvc.onRequest

    if(!this.photoSvc.photo){
      this.router.navigate(['/'])
      return
    }

    //subscribe manually to be used for like counter
    this.postSubscription = this.post$.subscribe((response) => {
      this.postId = response.postId;
      console.log('postId:', this.postId);
    });
    
    this.photoFile = this.photoSvc.photo
    this.convertToDataUrl(this.photoFile)
  }


  //function to convert file to dataUrl
  convertToDataUrl(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.photoDataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  thumbsUp() {
    console.log('>>>>postId>>>>>', this.postId)
    this.plusCount = 1
    const likes: Likes = {postId: this.postId, plusCount: this.plusCount, minusCount:0}
    this.like$ = firstValueFrom(this.uploadSvc.uploadLike(likes))
   
    
  }

  thumbsDown(){
    console.log('>>>>postId>>>>>', this.postId)
    this.minusCount = 1
    const likes: Likes = {postId: this.postId, plusCount:0, minusCount: this.minusCount}
    this.like$ = firstValueFrom(this.uploadSvc.uploadLike(likes))
  }

  ngOnDestroy(): void {
    // Unsubscribe in the ngOnDestroy lifecycle hook
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }


}
