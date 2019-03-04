import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { Meeting } from '@app/examples/meetings/meeting.model';
import {
  meetingAdapter,
  MeetingState
} from '@app/examples/meetings/meeting.state';

// get the selectors
const {
  selectEntities,
  selectAll,
  selectIds,
  selectTotal
} = meetingAdapter.getSelectors();

export const getError = (state: MeetingState): any => state.error;

export const getIsLoading = (state: MeetingState): boolean => state.isLoading;

export const selectMeetingState: MemoizedSelector<
  object,
  MeetingState
> = createFeatureSelector<MeetingState>('meetings');

export const selectAllMeetingItems: (
  state: object
) => Meeting[] = meetingAdapter.getSelectors(selectMeetingState).selectAll;

export const selectMeetingById = (id: number) =>
  createSelector(this.selectAllMeetingItems, (allMeetings: Meeting[]) => {
    if (allMeetings) {
      return allMeetings.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectMeetingError: MemoizedSelector<object, any> = createSelector(
  selectMeetingState,
  getError
);

export const selectMeetingIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectMeetingState, getIsLoading);
