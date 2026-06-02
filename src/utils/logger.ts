const isDev = import.meta.env.DEV;

/**
 * Professional logger utility to manage application logs.
 * Logs are only displayed in development mode.
 */
export const logger = {
  info: (...args: unknown[]) => {
    if (isDev) {
      console.log("[INFO]:", ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error("[ERROR]:", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn("[WARN]:", ...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.debug("[DEBUG]:", ...args);
    }
  },
};
