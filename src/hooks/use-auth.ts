import { useState, useEffect } from "react";
import { UsersService } from "../services/api/services/UsersService";
import type { internal_api_UserResponse } from "../services/api/models/internal_api_UserResponse";

export function useAuth() {
  const [user, setUser] = useState<internal_api_UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log("Iniciando verificación de sesión en /me...");
        const userData = await UsersService.getMe();
        console.log("Sesión verificada. Usuario:", userData);
        setUser(userData);
      } catch (error: any) {
        console.error("Error al verificar sesión:", {
          status: error.status,
          message: error.message,
          body: error.body
        });
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return { user, loading, setUser };
}
