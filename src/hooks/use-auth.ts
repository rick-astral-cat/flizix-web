import { useState, useEffect } from 'react';
import { UsersService } from '../services/api/services/UsersService';
import type { api_UserResponse } from '../services/api/models/api_UserResponse';
import { logger } from '../utils/logger';

/**
 * Hook to manage and provide the current user's authentication state.
 */
export function useAuth() {
  const [user, setUser] = useState<api_UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        logger.info('Starting session verification at /me...');
        const userData = await UsersService.getMe();
        logger.info('Session verified. User:', userData);
        setUser(userData);
      } catch {
        logger.error('Failed to verify session');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return { user, loading, setUser };
}
