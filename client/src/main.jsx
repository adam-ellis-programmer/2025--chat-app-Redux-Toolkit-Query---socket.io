import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import {
  EmailRegister,
  EmailSignIn,
  HomeLayout,
  HomePage,
  ChatLayout,
  ChatPage,
  UserDash,
} from './pages/index.js'
import CreateChatPage from './pages/CreateChatPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: 'email-sign-in', Component: EmailSignIn },
      { path: 'email-register', Component: EmailRegister },
    ],
  },
  {
    path: 'chat',
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: ChatPage },
      { path: 'create', Component: CreateChatPage },
      { path: 'user', Component: UserDash },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

/*
EXPLANATION:
- Wrap app with Redux Provider
- Pass store to Provider
- Now all components can access Redux state
*/
