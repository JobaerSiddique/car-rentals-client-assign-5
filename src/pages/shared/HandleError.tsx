import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Type guard to check if error is FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error === 'object' && 'status' in error;
};

// Type guard to check if error is SerializedError
const isSerializedError = (error: any): error is SerializedError => {
  return error && typeof error === 'object' && 'message' in error;
};

export const handleError = (error: FetchBaseQueryError | SerializedError) => {
  let errorMessage = 'An unknown error occurred.';

  if (isFetchBaseQueryError(error)) {
    // This is a FetchBaseQueryError
    errorMessage = error.data?.message || 'An error occurred';
  } else if (isSerializedError(error)) {
    // This is a SerializedError
    errorMessage = error.message || 'An error occurred';
  }

  toast(errorMessage);
};
