import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StartRequest, StartResponse, } from '../models/start.dto';
import { NextRequest, NextResponse, } from '../models/next.dto';
import { GetAllRequest, GetAllResponse, } from '../models/all.dto';


@Injectable({
  providedIn: 'root',
})
export class PermutationsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  start(request: StartRequest): Observable<StartResponse> {
    return this.http.post<StartResponse>(
      `${this.baseUrl}/start`,
      request,
    );
  }

  next(request: NextRequest): Observable<NextResponse> {
    return this.http.post<NextResponse>(
      `${this.baseUrl}/next`,
      request,
    );
  }

  getAll(request: GetAllRequest): Observable<GetAllResponse> {
    const params = new HttpParams()
      .set('n', request.n)
      .set('start_index', request.startIndex)
      .set('page', request.page)
      .set('page_size', request.pageSize);
    return this.http.get<GetAllResponse>(
      `${this.baseUrl}/all`,
      { params },
    );
  }
}