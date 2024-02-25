import {AxiosResponse} from 'axios';

// Extends the request type with an optional id
export type RequestWithId<TRequest> = TRequest & {id?: number | string};

// Defines the form props with inferred types based on the storeFunction
export interface PuddleFormProps<TRequest = unknown, TReply = TRequest> {
  initialValues?: RequestWithId<Partial<TRequest>>;
  storeFunction?: (
    request: RequestWithId<Partial<TRequest>>,
    validationOnly?: boolean,
    fieldToValidate?: string
  ) => Promise<AxiosResponse<RequestWithId<TReply>>>;
  updateFunction?: (
    id: string | number,
    request: RequestWithId<Partial<TRequest>>,
    validationOnly?: boolean,
    fieldToValidate?: string
  ) => Promise<AxiosResponse<RequestWithId<TReply>>>;
}

// Defines a type for managing form state and operations, utilizing generic type for flexibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TRequest is going to be defined by the user
export type PuddleBag<TRequest = any, TReply = TRequest> = {
  isSaving: boolean;
  model?: RequestWithId<Partial<TRequest>>;
  setModel?: (model: RequestWithId<Partial<TRequest>>) => void;
  errors?: Record<keyof TRequest, string[]>; // Simplified to use string keys for broad utility
  updateField: (field: keyof TRequest, value: string | number | unknown) => void;
  save: (mode?: 'store' | 'update') => Promise<RequestWithId<TReply>>;
  validateField: (field: keyof TRequest, value: unknown) => Promise<void>;
  fieldHasError: (field: keyof TRequest) => boolean;
  getFieldError: (field: keyof TRequest) => string | undefined;
};
