import axios, {AxiosRequestConfig} from 'axios';

export interface Model {
  id: number;
  name: string;
  description: string;
  tags: string[];
  state: string;
  day: string;
  date: string;
  is_enabled: boolean;
  assignees: string[];
  phone: string;
}

export interface StoreRequest {
  id?: number;
  client_id?: number;
  name: string;
}
export const puddleStore = (
  request: Partial<StoreRequest>,
  validationOnly: boolean = false,
  fieldToValidate: string = '',
  config: AxiosRequestConfig = {}
) => {
  return axios.post<Model>(`/api/test`, request, {
    headers: {
      Precognition: validationOnly,
      ...(fieldToValidate ? {'Precognition-Validate-Only': fieldToValidate} : {}),
    },
    ...config,
  });
};

export const puddleUpdate = (
  id: string | number,
  request: Partial<StoreRequest>,
  validationOnly: boolean = false,
  fieldToValidate: string = '',
  config: AxiosRequestConfig = {}
) => {
  return axios.put<Model>(`/api/test/${id}`, request, {
    headers: {
      Precognition: validationOnly,
      ...(fieldToValidate ? {'Precognition-Validate-Only': fieldToValidate} : {}),
    },
    ...config,
  });
};
