import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';
import { bookReducer } from './crud/books.reducer';
import { formReducer } from './form/form.reducer';
import { meetingReducer } from './meetings/meeting.reducer';
import { FormState } from './form/form.model';
import { Book, BookState } from './crud/books.model';
import { MeetingState } from './meetings/meeting.state';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
  todos: todosReducer,
  stocks: stockMarketReducer,
  books: bookReducer,
  meetings: meetingReducer,
  form: formReducer
};

export interface ExamplesState {
  todos: TodosState;
  stocks: StockMarketState;
  books: BookState;
  meetings: MeetingState;
  form: FormState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
