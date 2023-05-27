import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UploadService } from '../upload.service';
import { Post } from '../models';
import { Router } from '@angular/router';

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
    console.info('>>> data: ', data)
    console.info('>>> file: ', imageFile)

    //use promise
    firstValueFrom(this.uploadSvc.upload(data['title'], data['comments'], imageFile))
      .then(result=>{
        alert('uploaded')
        this.form.reset
        this.router.navigate(['/post'])
      })
      .catch(err =>{
        alert(JSON.stringify(err))
      })
  }
}
