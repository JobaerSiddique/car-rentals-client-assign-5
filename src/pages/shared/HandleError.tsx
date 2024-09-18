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

// Helper function to check if error.data is an object and has a message
const isErrorWithMessage = (data: any): data is { message: string } => {
  return data && typeof data === 'object' && 'message' in data;
};

export const handleError = (error: FetchBaseQueryError | SerializedError) => {
  let errorMessage = 'An unknown error occurred.';

  if (isFetchBaseQueryError(error)) {
    // Check if error.data has a message property
    if (isErrorWithMessage(error.data)) {
      errorMessage = error.data.message || 'An error occurred';
    } else {
      errorMessage = 'An error occurred';
    }
  } else if (isSerializedError(error)) {
    errorMessage = error.message || 'An error occurred';
  }

  toast(errorMessage);
};
