
import useFetch from '../utils/httpClient';
import { AuthResponseDto, LoginDto, RefreshTokenDto, RegisterUserDto } from '../types/auth-dto';
import { UserDto } from '../types/user-dto';
import { useAuthContext } from '../lib/AuthProvider';


// Context fonksiyonları parametre olarak alınır

const useAuthService = () => {
  const { post } = useFetch();
  const { setAccessToken, setUserName, setIsLoggingOut } = useAuthContext();

  // POST /api/auth/login
  const login = async (data: LoginDto) => {
    const response = await post<AuthResponseDto>({ controller: 'auth', action: 'login', data, withCredentials: true });
    if (response.success && response.data?.accessToken) {
      setAccessToken(response.data.accessToken);
      setUserName(response.data.username);
    }
    return response;
  };

  // POST /api/auth/refresh-token
  const refreshToken = async () => {
    const response = await post<AuthResponseDto>({ controller: 'auth', action: 'refresh-token', withCredentials: true });
    if (response.success && response.data?.accessToken) {
      setAccessToken(response.data.accessToken);
      setUserName(response.data.username);
    }
    return response;
  };

  // POST /api/auth/logout
  const logout = async () => {
    setIsLoggingOut(true);
    const response = await post<boolean>({ controller: 'auth', action: 'logout', withCredentials: true });
    if (response.success){
      setAccessToken(null);
      setUserName(null);
    }
    setIsLoggingOut(false);
    return response;
  };

  return { login, refreshToken, logout };
};

export default useAuthService;
