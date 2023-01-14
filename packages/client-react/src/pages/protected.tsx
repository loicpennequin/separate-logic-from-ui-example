import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <p>This is a protected page</p>
    </ProtectedRoute>
  );
}
