import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"

@Injectable()
export class UploadService{

    http=inject(HttpClient)

    upload(title: string, comments: string, file: File): Observable<any>{
        const formData = new FormData()
         // @RequestPart String title
        formData.set('title', title)
        formData.set('comments', comments)
        // @RequestPart MultipartFile myFile
        formData.set('myFile', file)

        return this.http.post<any>('http://localhost:8080/upload', formData)
    }

}