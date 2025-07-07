import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    // replace for better UX
    return <Navigate to='/email-sign-in' replace />
  }

  return children
}

export default ProtectedRoute

/*
EXPLANATION:
- Checks Redux auth state
- Redirects to login if not authenticated
- Protects chat routes from unauthorized access
*/
