import { Action, combineReducers, createReducer, createSelector, on, State } from "@ngrx/store";
import { Person } from "../person/person";
import { FILTER_VALUE_CHANGED, PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_FAILED, PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED, PERSON_SELECTED, PERSON_SELECTION_CLEARED } from "./app.actions";

export const PERSON_STATE_LOADING: string = 'loading', PERSON_STATE_LOADED: string = 'loaded', PERSON_STATE_ERROR: string = 'error';

export interface AppState {
    allPersons: Person[],
    selectedPerson?: Person,
    loadstate: string,
    message?: string,
    filter?: string
}

export const INITIAL_STATE: AppState = { allPersons: [], loadstate: PERSON_STATE_LOADING, filter: '' }

const _actualPersonsReducer = createReducer(
    INITIAL_STATE,
    on(PERSON_REDUCER_TOKEN_INIT, state => ({ ...state, loadstate: PERSON_STATE_LOADING })),
    on(PERSON_REDUCER_TOKEN_FETCHED, (state, action) => ({ allPersons: action.persons, loadstate: PERSON_STATE_LOADED })),
    on(PERSON_REDUCER_TOKEN_FAILED, (state, action) => ({ allPersons: [], loadstate: PERSON_STATE_ERROR, message: action.error })),
    on(PERSON_REDUCER_TOKEN_ADDED, (state, action) => ({ allPersons: [...state.allPersons, action.added], loadstate: PERSON_STATE_LOADED })),
    on(PERSON_REDUCER_TOKEN_UPDATED, (state, action) => ({ allPersons: state.allPersons.map((p: Person) => p.id === action.updated.id ? action.updated : p), loadstate: PERSON_STATE_LOADED })),
    on(PERSON_REDUCER_TOKEN_REMOVED, (state, action) => ({ allPersons: state.allPersons.filter((p: Person) => p.id !== action.removed.id), loadstate: PERSON_STATE_LOADED }))
);

const allPersonsReducer = (state: AppState | undefined, action: Action) => _actualPersonsReducer(state, action);

const _actualSelectedPersonReducer = createReducer(
    INITIAL_STATE,
    on(PERSON_SELECTED, (state, action) => ({ ...state, selectedPerson: action.person })),
    on(PERSON_SELECTION_CLEARED, (state, action) => ({...state, selectedPerson: undefined}))
);

const selectedPersonReducer = (state: AppState | undefined, action: Action) => _actualSelectedPersonReducer(state, action);

const _actualFilterValueChangedReducer = createReducer(
    INITIAL_STATE,
    on(FILTER_VALUE_CHANGED, (state, action) => ({...state, filter: action.filter}))
);
const filterReducer = (state: AppState | undefined, action: Action) => _actualFilterValueChangedReducer(state, action);

export const rootReducer = combineReducers({
    allPersonsReducer,
    selectedPersonReducer,
    filterReducer
});

export interface PersonsState {
    allPersons: Person[],
    loadstate: string,
    message?: string
}

export const getPersonState = createSelector(
    (state: any) => state.rootReducer.allPersonsReducer,
    (state: AppState) =>({ allPersons: state.allPersons, loadstate: state.loadstate, message: state.message} as PersonsState));

export const getSelectedPerson = createSelector(
    (state: any) => state.rootReducer.selectedPersonReducer,
    (state: AppState) => state.selectedPerson);

export const getFilterValue = createSelector(
    (state: any) => state.rootReducer.filterReducer,
    (state: AppState) => state.filter
);

export const getPersonById = createSelector(
    (state: any) => state.rootReducer.allPersonsReducer,
    (state: AppState, props: { id: string|null}) => state.allPersons.find((pers:Person) => pers.id === props.id)
);