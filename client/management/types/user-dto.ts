export interface UserDto {
  id: string;
  username: string;
  email: string;
  roles: string[];
  // Diğer gerekli alanlar eklenebilir
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  roles?: string[];
  // Diğer güncellenebilir alanlar eklenebilir
}
