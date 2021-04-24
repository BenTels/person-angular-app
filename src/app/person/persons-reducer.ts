import { createReducer, on, State } from "@ngrx/store";
import { Person } from "./person";
import { PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_FAILED, PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED } from "./person-actions";

export const PERSON_STATE_LOADING: string = 'loading', PERSON_STATE_LOADED: string = 'loaded', PERSON_STATE_ERROR: string = 'error';

export interface PersonState {
    data: Person[],
    loadstate: string,
    message?: string
}

export const PERSON_INITIAL_STATE: PersonState = {data: [], loadstate: PERSON_STATE_LOADING}

const _actualPersonsReducer = createReducer(
    PERSON_INITIAL_STATE,
    on(PERSON_REDUCER_TOKEN_INIT, state => ({...state, loadstate: PERSON_STATE_LOADING})),
    on(PERSON_REDUCER_TOKEN_FETCHED, (state, action) => ({data: action.persons, loadstate: PERSON_STATE_LOADED})),
    on(PERSON_REDUCER_TOKEN_FAILED, (state, action) => ({data: [], loadstate: PERSON_STATE_ERROR, message: action.error})),
    on(PERSON_REDUCER_TOKEN_ADDED, (state, action)=>({data: [...state.data, action.added], loadstate: PERSON_STATE_LOADED})),
    on(PERSON_REDUCER_TOKEN_UPDATED, (state, action)=>({data: state.data.map((p:Person) => p.id === action.updated.id ? action.updated : p), loadstate: PERSON_STATE_LOADED})),
    on(PERSON_REDUCER_TOKEN_REMOVED, (state, action)=>({data: state.data.filter((p:Person) => p.id !== action.removed.id), loadstate: PERSON_STATE_LOADED}))
);

export const personsReducer = (state: PersonState | undefined, action: any) => _actualPersonsReducer(state, action);