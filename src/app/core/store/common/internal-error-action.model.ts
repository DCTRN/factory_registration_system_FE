import { createAction } from '@ngrx/store';

export const internalErrorType = '[ERROR] INTERNAL_ERROR';
export const internalError = createAction(internalErrorType);
