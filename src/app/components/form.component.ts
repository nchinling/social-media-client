import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, first, firstValueFrom } from 'rxjs';
import { UploadService } from '../upload.service';
import { Post, PostResponse } from '../models';
import { Params, Router } from '@angular/router';
import { PhotoService } from '../photo.service';
// import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form!: FormGroup
  fb=inject(FormBuilder)
  uploadSvc = inject(UploadService)
  router = inject(Router)
  photoSvc = inject(PhotoService)

  post$!: Promise<PostResponse>
  // post$!: Observable<PostResponse>

  @ViewChild('uploadFile')
  uploadFile!: ElementRef

  ngOnInit(): void{
    this.form = this.fb.group({
      title: this.fb.control<string>('', [Validators.required]),
      file: this.fb.control<File | null>(null, [Validators.required]),
      comments: this.fb.control<string>('', [Validators.required]),
    })
  }

  upload(){
    const data:Post = this.form.value
    const imageFile: File = this.uploadFile.nativeElement.files[0]
    this.photoSvc.photo = imageFile
    console.info('>>> data: ', data)
    console.info('>>> file: ', imageFile)

    //Using promise
    this.post$=firstValueFrom(this.uploadSvc.upload(data['title'], data['comments'], imageFile))
    alert('uploaded') 
    this.form.reset
    this.router.navigate(['/post'])

    //Using Observable. Be careful when firing/passing info with Observable as it is asynchronous. 
    //Consider using Promise which will take firstValue 
    // this.post$ = this.uploadSvc.upload(data['title'], data['comments'], imageFile)
    // alert('uploaded')
    // this.form.reset
    // this.router.navigate(['/post'])


  }
}
