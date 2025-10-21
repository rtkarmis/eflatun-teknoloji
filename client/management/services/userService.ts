// User API çağrıları için örnek servis
import { UserDto, UpdateUserDto } from '@/types/user-dto';
import useFetch from '../utils/httpClient';
import { RegisterUserDto } from '@/types/auth-dto';

const useUserService = () => {
  const { get,post, put, deleted } = useFetch();

  // GET /api/user => List<UserDto>
  const getUsers = async () => {
    return await get<UserDto[]>({ controller: 'user' });
  };

  // GET /api/user/{id} => UserDto
  const getUserById = async (id: string) => {
    return await get<UserDto>({ controller: 'user', action: id });
  };

  // PUT /api/user/{id} => UserDto
  const updateUser = async (id: string, data: UpdateUserDto) => {
    return await put<UserDto>({ controller: 'user', action: id, data });
  };

  // DELETE /api/user/{id} => bool
  const deleteUser = async (id: string) => {
    return await deleted<boolean>({ controller: 'user', action: id });
  };

    // POST /api/user/register
  const register = async (data: RegisterUserDto) => {
    const response = await post<UserDto>({ controller: 'user', action: 'register', data });
    return response;
  };

  return { getUsers, getUserById, updateUser, deleteUser, register };
};

export default useUserService;
