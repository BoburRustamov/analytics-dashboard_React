import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardLayout } from '../widgets/layout/DashboardLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { RevenuePage } from '../pages/revenue/RevenuePage';
import { DataSourcesPage } from '../pages/data/DataSourcesPage';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="data" element={<DataSourcesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};