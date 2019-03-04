import { v4 as uuid } from 'uuid';

import { TodosActions, TodosActionTypes } from './todos.actions';
import { Todo, TodosState } from './todos.model';

export const initialState: TodosState = {
  items: [
    {
      id: uuid(),
      name:
        'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do -Pele',
      done: true
    },
    {
      id: uuid(),
      name:
        'If you want to be more productive, you need to become master of your minutes.-Crystal Paine.',
      done: false
    },
    {
      id: uuid(),
      name:
        'Appreciation is a wonderful thing; it makes what is excellent in others belong to us as well - Francois-Marie Arouet de Voltaire',
      done: false
    }
  ],
  filter: 'ALL'
};

export function todosReducer(
  state: TodosState = initialState,
  action: TodosActions
): TodosState {
  switch (action.type) {
    case TodosActionTypes.ADD:
      return {
        ...state,
        items: [
          {
            id: action.payload.id,
            name: action.payload.name,
            done: false
          },
          ...state.items
        ]
      };

    case TodosActionTypes.TOGGLE:
      return {
        ...state,
        items: state.items.map(
          (item: Todo) =>
            item.id === action.payload.id ? { ...item, done: !item.done } : item
        )
      };

    case TodosActionTypes.REMOVE_DONE:
      return {
        ...state,
        items: state.items.filter((item: Todo) => !item.done)
      };

    case TodosActionTypes.FILTER:
      return { ...state, filter: action.payload.filter };

    default:
      return state;
  }
}
