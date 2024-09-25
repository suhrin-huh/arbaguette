import AsyncStorage from '@react-native-async-storage/async-storage';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

export interface Decode extends JwtPayload {
  role: Role;
  string: string;
}

const decodeToken = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  const decoded = jwtDecode<Decode>(token);
  console.log(decoded);
  return decoded;
};

export default decodeToken;
