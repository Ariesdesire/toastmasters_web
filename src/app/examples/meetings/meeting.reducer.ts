import { MeetingActions, MeetingActionTypes } from './meeting.actions';
import { initialState, meetingAdapter, MeetingState } from './meeting.state';

export function meetingReducer(
  state = initialState,
  action: MeetingActions
): MeetingState {
  console.log(action.type);
  switch (action.type) {
    case MeetingActionTypes.LOAD_MEETINGS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case MeetingActionTypes.LOAD_MEETINGS_SUCCESS: {
      return meetingAdapter.addAll(action.payload.meetings, {
        ...state,
        loading: false,
        error: null
      });
    }
    case MeetingActionTypes.LOAD_MEETINGS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
}
