import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';
import { PostComponent } from './components/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { UploadService } from './upload.service';

const appRoutes:Routes = [
  
  {path: '', component: FormComponent, title: 'Post'},
  {path: 'post', component: PostComponent, title: 'Upload'},
  {path: '**', redirectTo:'/', pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PostComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
