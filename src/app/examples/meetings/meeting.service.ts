import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Meeting } from './meeting.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const PROXY_URL = 'http://localhost:8888/meetings';

@Injectable()
export class MeetingService {
  constructor(private http: HttpClient) {}

  retrieveAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(PROXY_URL).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  retrieveMeeting(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(PROXY_URL + `${id}`).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  //
  createMeeting(meeting: Meeting): Observable<Meeting> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    meeting.id = null;
    return this.http
      .post<Meeting>(PROXY_URL, meeting, { headers: headers })
      .pipe(
        tap(data => console.log('createMeeting: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${PROXY_URL}/${meeting.id}`;
    return this.http.put<Meeting>(url, meeting, { headers: headers }).pipe(
      tap(() => console.log('updateMeeting: ' + meeting.id)),
      // Update the item in the list
      // This is required because the selected meeting that was edited
      // was a copy of the item from the array.

      // Return the meeting on an update
      map(() => meeting),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
