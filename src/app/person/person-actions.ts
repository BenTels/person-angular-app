import { createAction, props } from "@ngrx/store";
import { Person } from "./person";

export const PERSON_REDUCER_TOKEN_INIT = createAction('PERSON_FETCH_INIT');
export const PERSON_REDUCER_TOKEN_FETCHED = createAction('PERSON_FETCH_SUCCEEDED', props<{ persons: Person[]}>());
export const PERSON_REDUCER_TOKEN_FAILED = createAction('PERSON_FETCH_FAILED', props<{error: string}>());
export const PERSON_REDUCER_TOKEN_REMOVED = createAction('PERSON_REMOVED', props<{removed: Person}>());
export const PERSON_REDUCER_TOKEN_UPDATED = createAction('PERSON_UPDATED', props<{updated: Person}>());
export const PERSON_REDUCER_TOKEN_ADDED = createAction('PERSON_ADDED', props<{added: Person}>());