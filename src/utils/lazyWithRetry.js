import { lazy } from 'react';

/**
 * Lazy-load with a short retry for transient chunk/CSS preload failures.
 * Some browsers/networks intermittently fail Vite preload links on first attempt.
 */
export function lazyWithRetry(importer, retries = 2, delayMs = 200) {
  return lazy(async () => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await importer();
      } catch (error) {
        lastError = error;
        if (attempt >= retries) break;
        await new Promise((resolve) => window.setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
    throw lastError;
  });
}

