export interface LoginDto {
  username: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
  // Diğer gerekli alanlar eklenebilir
}
export interface AuthResponseDto {
  accessToken: string | null;
  refreshToken: string | null;
  refreshTokenExpiryTime: string | null;
  username: string | null;
};