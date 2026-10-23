import type { Metadata } from 'next';
import { LoginView } from '../../components/views';

export const metadata: Metadata = { title: 'Login' };

export default function LoginRoute() {
  return <LoginView />;
}
