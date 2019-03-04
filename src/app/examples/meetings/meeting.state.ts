import { Meeting } from './meeting.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { BookState } from '@app/examples/crud/books.model';
import { bookAdapter } from '@app/examples/crud/books.reducer';

export function sortByDate(a: Meeting, b: Meeting): number {
  return a.date.getTime() - b.date.getTime();
}

export const meetingAdapter: EntityAdapter<Meeting> = createEntityAdapter<
  Meeting
>({
  selectId: (meeting: Meeting) => meeting.id,
  sortComparer: sortByDate
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[] | number[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface MeetingState extends EntityState<Meeting> {
  isLoading?: boolean;
  error?: string;
}

// export const initialState: MeetingState = meetingAdapter.getInitialState({
//
// });

//
export const initialState: MeetingState = meetingAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      date: '2019-02-28T06:11:00.000Z',
      theme: 'Getting Unstuck'
    }
  },
  isLoading: false,
  error: null
});
//
//
