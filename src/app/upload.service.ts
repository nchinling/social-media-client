import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Observable, Subject, count, filter, tap } from "rxjs"
import { Likes, LikesResponse, PostResponse } from "./models"

@Injectable()
export class UploadService{

    http=inject(HttpClient)

    onRequest = new Subject<PostResponse>()

    request$ = Observable<PostResponse>

    //A) Works with both Observable and Promise
    upload(title: string, comments: string, file: File): Observable<PostResponse> {
        const formData = new FormData();
        formData.set('title', title);
        formData.set('comments', comments);
        formData.set('imageFile', file);
      
        return  this.http.post<PostResponse>('http://localhost:8080/upload', formData).pipe(
          filter((response) => response !== null), // Filter out null responses
          tap(resp => this.onRequest.next(resp))
        );

      }
   
    //B) With Promise
    // upload(title: string, comments: string, file: File): Observable<PostResponse>{
    //     const formData = new FormData()
    //      // @RequestPart String title
    //     formData.set('title', title)
    //     formData.set('comments', comments)
    //     // @RequestPart MultipartFile myFile
    //     formData.set('imageFile', file)

    //     return this.http.post<PostResponse>('http://localhost:8080/upload', formData)
    //     .pipe(
    //         tap(resp => this.onRequest.next(resp))
    //     )
    // }

    //C) Works with Observable and Promise
    // upload(title: string, comments: string, file: File): Observable<PostResponse> {
    //     const formData = new FormData();
    //     formData.set('title', title);
    //     formData.set('comments', comments);
    //     formData.set('imageFile', file);
      
    //     const request$ = this.http.post<PostResponse>('http://localhost:8080/upload', formData).pipe(
    //       filter((response) => response !== null) // Filter out null responses
    //     );
      
    //     request$.subscribe(
    //       (response) => this.onRequest.next(response),
    //       (error) => {
    //         // Handle error if needed
    //       }
    //     );
      
    //     return request$;
    //   }

    //Works with both Observable and Promise
    uploadLike(likes: Likes): Observable<LikesResponse> {
        const strNum = String(count)
        console.info('>>>I am inside uploadLikes')
        return this.http.post<LikesResponse>('http://localhost:8080/likes', likes).pipe(
          filter((response) => response !== null), // Filter out null responses
        );

      }

}