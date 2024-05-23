import {useCallback, useEffect, useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- it is used
import axios, {AxiosError} from 'axios';
import {PuddleBag, PuddleFormProps} from '../types/types';

const usePuddleForm = <TRequest = unknown, TReply = TRequest>(
  {
    initialValues,
    storeFunction = () => Promise.reject(new Error('No store function provided')),
    updateFunction = () => Promise.reject(new Error('No update function provided')),
  }: PuddleFormProps<TRequest, TReply>,
  dependencies: Array<unknown> = []
): PuddleBag<TRequest, TReply> => {
  const [isSaving, setIsSaving] = useState(false);
  const [model, setModel] = useState(initialValues);
  const [errors, setErrors] = useState<Record<keyof TRequest, string[]>>();

  const updateField = (field: keyof TRequest, value: string | number | unknown) => {
    if (model) {
      setModel({...model, [field]: value});
    } else {
      setModel({[field]: value} as Partial<TRequest>);
    }
  };

  const save = async (mode?: 'store' | 'update') => {
    if (!model) throw new Error('No model to save');

    setIsSaving(true);
    try {
      if (mode === 'store') {
        const reply = await storeFunction(model);
        return reply.data;
      }

      if (mode === 'update') {
        const reply = await updateFunction(model.id!, model);
        return reply.data;
      }

      // If mode is not specified, we'll try to update if the model has an id, otherwise we'll store it
      const reply = model?.id ? await updateFunction(model.id, model) : await storeFunction(model);

      return reply.data;
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        setErrors(e.response?.data?.errors);
      } else {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    } finally {
      setIsSaving(false);
    }

    throw new Error('Failed to save');
  };

  const validateField = async (field: keyof TRequest, value: string | number | unknown) => {
    try {
      if (model && model.id) {
        await updateFunction(model.id, {[field]: value} as Partial<TRequest>, true, String(field));
      } else {
        await storeFunction({[field]: value} as Partial<TRequest>, true, String(field));
      }

      if (errors && field in errors) {
        const newErrors = {...errors};
        delete newErrors[field];
        setErrors(newErrors);
      }
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        if (errors) {
          setErrors({
            ...errors,
            [field]: e.response?.data?.errors[field],
          });
        } else {
          setErrors(e.response?.data?.errors);
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  };

  const fieldHasError = useCallback(
    (field: keyof TRequest | string) => !!errors && field in errors,
    [errors]
  );

  const getFieldError = useCallback(
    (field: keyof TRequest) => {
      try {
        return errors && field in errors ? errors[field].join(', ') : undefined;
      } catch (e) {
        return undefined;
      }
    },
    [errors]
  );

  useEffect(() => {
    setModel(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    isSaving,
    model,
    setModel,
    errors,
    updateField,
    save,
    validateField,
    fieldHasError,
    getFieldError,
  };
};

export default usePuddleForm;
