import { AppShell, Burger, Group, NavLink, Text, Avatar, Menu, ActionIcon, Box, Badge, Modal, Stack, Kbd, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconHome,
  IconChartBar,
  IconUsers,
  IconSettings,
  IconBell,
  IconLogout,
  IconChartLine,
  IconChartPie,
  IconFileAnalytics,
  IconDatabase,
  IconUser,
  IconPalette,
  IconShield,
  IconKeyboard,
  IconInfoCircle,
  IconFileExport,
} from '@tabler/icons-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $user, logout } from '../../entities/auth/model';
import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';

const navigation = [
  { label: 'Dashboard', icon: IconHome, href: '/dashboard' },
  { label: 'Analytics', icon: IconChartBar, href: '/analytics' },
  { label: 'Reports', icon: IconFileAnalytics, href: '/reports' },
  { label: 'Revenue', icon: IconChartLine, href: '/revenue' },
  { label: 'Users', icon: IconUsers, href: '/users' },
  { label: 'Data Sources', icon: IconDatabase, href: '/data' },
  { label: 'Settings', icon: IconSettings, href: '/settings' },
];

export const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const [shortcutsOpened, { open: openShortcuts, close: closeShortcuts }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUnit($user);
  const { toggleColorScheme } = useMantineColorScheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportData = () => {
    // Simulate data export
    notifications.show({
      title: 'Export Started',
      message: 'Your data is being prepared for export. You will be notified when ready.',
      color: 'blue',
    });

    // Simulate export completion after 2 seconds
    setTimeout(() => {
      notifications.show({
        title: 'Export Complete',
        message: 'Your data has been exported successfully!',
        color: 'green',
      });

      // Create and download a sample JSON file
      const sampleData = {
        exportDate: new Date().toISOString(),
        user: user?.name,
        analytics: {
          pageViews: 15234,
          uniqueVisitors: 8956,
          bounceRate: 42.3,
          avgSessionDuration: 185,
        },
        revenue: {
          total: 125450,
          monthly: 12545,
          growth: 15.2,
        }
      };

      const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const handleSystemInfo = () => {
    const info = {
      version: '2.0.0',
      environment: 'production',
      browser: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      lastUpdate: new Date().toLocaleString(),
    };

    notifications.show({
      title: 'System Information',
      message: (
        <Box>
          <Text size="xs">Version: {info.version}</Text>
          <Text size="xs">Environment: {info.environment}</Text>
          <Text size="xs">Timezone: {info.timezone}</Text>
          <Text size="xs">Language: {info.language}</Text>
        </Box>
      ),
      autoClose: 10000,
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + key combinations for navigation
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'd':
            e.preventDefault();
            navigate('/dashboard');
            break;
          case 'a':
            e.preventDefault();
            navigate('/analytics');
            break;
          case 's':
            e.preventDefault();
            navigate('/settings');
            break;
        }
      }

      // Ctrl + key combinations for actions
      if (e.ctrlKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            notifications.show({
              title: 'Search',
              message: 'Global search coming soon!',
              color: 'blue',
            });
            break;
          case 't':
            e.preventDefault();
            toggleColorScheme();
            break;
          case 'e':
            e.preventDefault();
            handleExportData();
            break;
          case 'n':
            e.preventDefault();
            navigate('/reports');
            notifications.show({
              title: 'New Report',
              message: 'Create a new report from the Reports page',
              color: 'blue',
            });
            break;
          case 'q':
            e.preventDefault();
            handleLogout();
            break;
        }
      }

      // F5 for refresh
      if (e.key === 'F5') {
        e.preventDefault();
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, toggleColorScheme]);

  return (
    <AppShell
      header={{ height: { base: 60, md: 70 } }}
      navbar={{
        width: { base: 200, md: 250, lg: 280 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap={8}>
              <IconChartPie size={28} color="#7c3aed" />
              <Text size="lg" fw={600}>
                Analytics Pro
              </Text>
            </Group>
          </Group>

          <Group gap="lg">
            <ActionIcon variant="subtle" size="lg">
              <Box pos="relative">
                <IconBell size={20} />
                <Badge
                  size="xs"
                  circle
                  pos="absolute"
                  top={-4}
                  right={-4}
                  color="red"
                  variant="filled"
                >
                  3
                </Badge>
              </Box>
            </ActionIcon>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Group gap="sm" style={{ cursor: 'pointer' }}>
                  <Avatar src={user?.avatar} radius="xl" size="sm" />
                  <Box>
                    <Text size="sm" fw={500}>
                      {user?.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user?.role}
                    </Text>
                  </Box>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={() => {
                    navigate('/settings');
                    // Navigate to account section after navigation
                    setTimeout(() => {
                      const accountSection = document.querySelector('[data-section="account"]') as HTMLElement;
                      accountSection?.click();
                    }, 100);
                  }}
                >
                  My Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={14} />}
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBell size={14} />}
                  onClick={() => {
                    navigate('/settings');
                    // Navigate to notifications section after navigation
                    setTimeout(() => {
                      const notifSection = document.querySelector('[data-section="notifications"]') as HTMLElement;
                      notifSection?.click();
                    }, 100);
                  }}
                >
                  Notifications
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconShield size={14} />}
                  onClick={() => {
                    navigate('/settings');
                    // Navigate to security section after navigation
                    setTimeout(() => {
                      const securitySection = document.querySelector('[data-section="security"]') as HTMLElement;
                      securitySection?.click();
                    }, 100);
                  }}
                >
                  Security
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Preferences</Menu.Label>
                <Menu.Item
                  leftSection={<IconPalette size={14} />}
                  onClick={() => {
                    navigate('/settings');
                    // Navigate to appearance section after navigation
                    setTimeout(() => {
                      const appearanceSection = document.querySelector('[data-section="appearance"]') as HTMLElement;
                      appearanceSection?.click();
                    }, 100);
                  }}
                >
                  Appearance
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  leftSection={<IconFileExport size={14} />}
                  onClick={handleExportData}
                >
                  Export Data
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconKeyboard size={14} />}
                  onClick={openShortcuts}
                >
                  Keyboard Shortcuts
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconInfoCircle size={14} />}
                  onClick={handleSystemInfo}
                >
                  System Info
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              label={item.label}
              leftSection={<item.icon size={18} />}
              active={location.pathname === item.href}
              onClick={() => navigate(item.href)}
              mb="xs"
              style={{
                borderRadius: '8px',
              }}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
                              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '1.5rem',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <Outlet />
        </div>
      </AppShell.Main>

      {/* Keyboard Shortcuts Modal */}
      <Modal
        opened={shortcutsOpened}
        onClose={closeShortcuts}
        title="Keyboard Shortcuts"
        size="md"
      >
        <Stack gap="md">
          <Box>
            <Text size="sm" fw={600} mb="xs">Navigation</Text>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Go to Dashboard</Text>
                <Group gap="xs">
                  <Kbd>Alt</Kbd> + <Kbd>D</Kbd>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Go to Analytics</Text>
                <Group gap="xs">
                  <Kbd>Alt</Kbd> + <Kbd>A</Kbd>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Go to Settings</Text>
                <Group gap="xs">
                  <Kbd>Alt</Kbd> + <Kbd>S</Kbd>
                </Group>
              </Group>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Text size="sm" fw={600} mb="xs">General</Text>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Search</Text>
                <Group gap="xs">
                  <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Toggle Theme</Text>
                <Group gap="xs">
                  <Kbd>Ctrl</Kbd> + <Kbd>T</Kbd>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Export Data</Text>
                <Group gap="xs">
                  <Kbd>Ctrl</Kbd> + <Kbd>E</Kbd>
                </Group>
              </Group>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Text size="sm" fw={600} mb="xs">Actions</Text>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">New Report</Text>
                <Group gap="xs">
                  <Kbd>Ctrl</Kbd> + <Kbd>N</Kbd>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Refresh Data</Text>
                <Kbd>F5</Kbd>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Logout</Text>
                <Group gap="xs">
                  <Kbd>Ctrl</Kbd> + <Kbd>Q</Kbd>
                </Group>
              </Group>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </AppShell>
  );
};