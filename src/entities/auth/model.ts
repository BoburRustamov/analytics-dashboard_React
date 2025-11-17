import { createStore, createEvent, createEffect, sample } from 'effector';

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Events
export const login = createEvent<LoginCredentials>();
export const logout = createEvent();
export const setUser = createEvent<User | null>();
export const setLoading = createEvent<boolean>();
export const setError = createEvent<string | null>();

// Effects
export const loginFx = createEffect<LoginCredentials, User, Error>(
  async (credentials) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock authentication - accept any username and password
    if (credentials.username && credentials.password) {
      // Generate a role based on username (for variety in demo)
      const role = credentials.username.toLowerCase().includes('admin') ? 'admin' :
                   credentials.username.toLowerCase().includes('viewer') ? 'viewer' : 'user';

      // Create display name from username
      const displayName = credentials.username
        .split(/[-_.]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      return {
        id: Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        name: displayName,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff`
      };
    }

    throw new Error('Username and password are required');
  }
);

// Stores
export const $user = createStore<User | null>(null);
export const $isAuthenticated = createStore<boolean>(false);
export const $isLoading = createStore<boolean>(false);
export const $error = createStore<string | null>(null);

// Store updates
$user
  .on(setUser, (_, user) => user)
  .on(loginFx.doneData, (_, user) => user)
  .reset(logout);

$isAuthenticated
  .on(loginFx.doneData, () => true)
  .on(setUser, (_, user) => user !== null)
  .reset(logout);

$isLoading
  .on(setLoading, (_, loading) => loading)
  .on(loginFx.pending, (_, pending) => pending);

$error
  .on(setError, (_, error) => error)
  .on(loginFx.failData, (_, error) => error.message)
  .reset(loginFx.done)
  .reset(login);

// Connect events to effects
sample({
  clock: login,
  target: loginFx,
});

// Logout effect
sample({
  clock: logout,
  fn: () => {
    localStorage.removeItem('user');
    return null;
  },
  target: setUser,
});

// Persist user to localStorage
$user.watch((user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
});

// Initialize user from localStorage
const savedUser = localStorage.getItem('user');
if (savedUser) {
  try {
    setUser(JSON.parse(savedUser));
  } catch (error) {
    console.error('Failed to parse saved user:', error);
  }
}