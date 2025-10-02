import { supabase } from './supabaseClient';

// Define error types
export type ErrorType = 'NetworkError' | 'ValidationError' | 'TechnicalError';

// Interface for structured error info
export interface StructuredError {
    type: ErrorType;
    message: string;
    originalError?: unknown;
}

// Interface for logging error to Supabase
import React from 'react'; // Import React for React.ErrorInfo

interface SupabaseErrorLog {
    heading: string;
    message: string;
    stack?: string;
    type: ErrorType;
    // created_at is handled by Supabase default now()
}
// Helper to detect network errors
const isNetworkError = (error: unknown): boolean => {
    if (typeof error === 'object' && error !== null) {
        // Check for fetch failure or network error strings
        if ('message' in error && typeof (error as any).message === 'string') {
            const msg = (error as any).message.toLowerCase();
            return msg.includes('failed to fetch') || msg.includes('networkerror');
        }
    }
    return false;
};

// Helper to detect validation errors (optional, can be extended)
const isValidationError = (error: unknown): boolean => {
    if (typeof error === 'object' && error !== null) {
        if ('name' in error && (error as any).name === 'ValidationError') {
            return true;
        }
    }
    return false;
};

// Main error handler function
export async function handleError(error: unknown, errorType: ErrorType = 'TechnicalError', _info?: React.ErrorInfo): Promise<StructuredError> {
    if (isNetworkError(error)) {
        // Network errors: do not log, return friendly message
        return {
            type: 'NetworkError',
            message: 'Unable to connect. Please check your internet.',
            originalError: error
        };
    }

    if (isValidationError(error)) {
        // Validation errors: return message without logging
        return {
            type: 'ValidationError',
            message: (error as any).message || 'Validation error occurred.',
            originalError: error
        };
    }

    // For technical errors: log to Supabase
    const heading = 'Technical Error in Back&Bone App';
    const message = (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error);
    const stack = (error && typeof error === 'object' && 'stack' in error) ? (error as any).stack : undefined;
    // const componentStack = info?.componentStack || undefined; // Get component stack from info (will not be logged to DB directly)
    // const timestamp = new Date().toISOString(); // created_at is handled by Supabase default now()

    const logEntry: SupabaseErrorLog = {
        heading,
        message,
        stack,
        type: errorType, // Use the passed errorType
        // component_stack is not in the DB schema, so we don't include it here
    };

    try {
        await supabase.from('error_logs').insert([logEntry]);
    } catch (logError) {
        // Logging failure should not block user experience
        console.error('Failed to log error to Supabase due to a database error:', logError); // Log logging errors
    }

    return {
        type: errorType, // Use the passed errorType
        message: 'An unexpected error occurred. Our team has been notified.',
        originalError: error
    };
}
