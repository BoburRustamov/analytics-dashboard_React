import {
  Stack,
  Text,
  Group,
  Switch,
  Box,
  Title,
  Select,
  Button,
  Grid,
  SegmentedControl,
  Slider,
  Checkbox,
  Badge,
  Divider,
  Paper,
  NavLink,
  TextInput,
  ColorSwatch,
  useMantineTheme,
} from '@mantine/core';
import {
  IconSettings,
  IconPalette,
  IconBell,
  IconShield,
  IconUser,
  IconSun,
  IconMoon,
  IconLanguage,
  IconClock,
  IconDeviceDesktop,
  IconMail,
  IconMessage,
  IconKey,
  IconShieldCheck,
  IconDevices,
  IconCheck,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';

export const SettingsPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [activeSection, setActiveSection] = useState('general');
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedColor, setSelectedColor] = useState('violet');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    marketing: false,
  });

  const accentColors = [
    { color: '#7c3aed', name: 'violet' },
    { color: '#3b82f6', name: 'blue' },
    { color: '#06b6d4', name: 'cyan' },
    { color: '#10b981', name: 'green' },
    { color: '#f59e0b', name: 'yellow' },
    { color: '#ef4444', name: 'red' },
    { color: '#8b5cf6', name: 'purple' },
    { color: '#ec4899', name: 'pink' },
  ];

  const settingsSections = [
    { id: 'general', label: 'General', icon: IconSettings },
    { id: 'appearance', label: 'Appearance', icon: IconPalette },
    { id: 'notifications', label: 'Notifications', icon: IconBell },
    { id: 'security', label: 'Security & Privacy', icon: IconShield },
    { id: 'account', label: 'Account', icon: IconUser },
  ];

  return (
    <Box style={{ width: '100%', maxWidth: '100%' }}>
      <Stack gap="lg">
        {/* Header */}
        <Box>
          <Title order={2} mb="xs">Settings</Title>
          <Text c="dimmed" size="sm">Manage your account settings and preferences</Text>
        </Box>

        {/* Main Content */}
        <Grid gutter="xl">
          {/* Sidebar */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper
              shadow="xs"
              radius="md"
              p="md"
              style={{
                backgroundColor: colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
                border: `1px solid ${colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2]}`,
              }}
            >
              <Stack gap="xs">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <NavLink
                      key={section.id}
                      active={activeSection === section.id}
                      label={section.label}
                      leftSection={<Icon size={18} />}
                      onClick={() => setActiveSection(section.id)}
                      data-section={section.id}
                      style={{
                        borderRadius: theme.radius.md,
                        backgroundColor: activeSection === section.id
                          ? colorScheme === 'dark'
                            ? theme.colors.dark[5]
                            : theme.colors.violet[0]
                          : 'transparent',
                      }}
                    />
                  );
                })}
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Content */}
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Paper
              shadow="xs"
              radius="md"
              p="xl"
              style={{
                backgroundColor: colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
                border: `1px solid ${colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2]}`,
              }}
            >
              {/* General Settings */}
              {activeSection === 'general' && (
                <Stack gap="lg">
                  <Box>
                    <Title order={3} mb="sm">General Settings</Title>
                    <Text size="sm" c="dimmed">Configure your basic preferences</Text>
                  </Box>
                  <Divider />

                  <Box>
                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Language</Text>
                        <Text size="xs" c="dimmed">Select your preferred language for the interface</Text>
                      </Box>
                      <Select
                        data={[
                          { value: 'en', label: 'English' },
                          { value: 'es', label: 'Spanish' },
                          { value: 'fr', label: 'French' },
                          { value: 'de', label: 'German' },
                          { value: 'zh', label: 'Chinese' },
                        ]}
                        defaultValue="en"
                        leftSection={<IconLanguage size={16} />}
                        style={{ width: 200 }}
                      />
                    </Group>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Timezone</Text>
                        <Text size="xs" c="dimmed">Set your local timezone for accurate time display</Text>
                      </Box>
                      <Select
                        data={[
                          { value: 'utc', label: 'UTC' },
                          { value: 'est', label: 'Eastern Time' },
                          { value: 'cst', label: 'Central Time' },
                          { value: 'mst', label: 'Mountain Time' },
                          { value: 'pst', label: 'Pacific Time' },
                        ]}
                        defaultValue="est"
                        leftSection={<IconClock size={16} />}
                        style={{ width: 200 }}
                      />
                    </Group>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Auto-save</Text>
                        <Text size="xs" c="dimmed">Automatically save your work as you make changes</Text>
                      </Box>
                      <Switch
                        checked={autoSave}
                        onChange={(event) => setAutoSave(event.currentTarget.checked)}
                        size="md"
                        color="violet"
                      />
                    </Group>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Data Export Format</Text>
                        <Text size="xs" c="dimmed">Default format for exporting your data</Text>
                      </Box>
                      <SegmentedControl
                        data={['CSV', 'JSON', 'Excel']}
                        defaultValue="CSV"
                      />
                    </Group>
                  </Box>

                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="filled" color="violet">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <Stack gap="lg">
                  <Box>
                    <Title order={3} mb="sm">Appearance</Title>
                    <Text size="sm" c="dimmed">Customize how the application looks</Text>
                  </Box>
                  <Divider />

                  <Box>
                    <Group justify="space-between" mb="lg">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Theme Mode</Text>
                        <Text size="xs" c="dimmed">Switch between light and dark themes</Text>
                      </Box>
                      <SegmentedControl
                        value={colorScheme}
                        onChange={toggleColorScheme as any}
                        data={[
                          {
                            label: (
                              <Group gap="xs">
                                <IconSun size={16} />
                                <span>Light</span>
                              </Group>
                            ),
                            value: 'light',
                          },
                          {
                            label: (
                              <Group gap="xs">
                                <IconMoon size={16} />
                                <span>Dark</span>
                              </Group>
                            ),
                            value: 'dark',
                          },
                          {
                            label: (
                              <Group gap="xs">
                                <IconDeviceDesktop size={16} />
                                <span>System</span>
                              </Group>
                            ),
                            value: 'auto',
                          },
                        ]}
                      />
                    </Group>

                    <Box mb="lg">
                      <Text size="sm" fw={500} mb="xs">Accent Color</Text>
                      <Text size="xs" c="dimmed" mb="md">Choose your preferred accent color</Text>
                      <Group>
                        {accentColors.map((item) => (
                          <Box
                            key={item.name}
                            onClick={() => setSelectedColor(item.name)}
                            style={{ cursor: 'pointer', position: 'relative' }}
                          >
                            <ColorSwatch
                              color={item.color}
                              size={36}
                              style={{
                                border: selectedColor === item.name
                                  ? `2px solid ${item.color}`
                                  : '2px solid transparent',
                                padding: 2,
                              }}
                            />
                            {selectedColor === item.name && (
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <IconCheck size={16} color="white" />
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Group>
                    </Box>

                    <Box mb="lg">
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>Font Size</Text>
                        <Badge variant="light" color="violet">{fontSize}px</Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mb="md">Adjust the base font size for better readability</Text>
                      <Slider
                        value={fontSize}
                        onChange={setFontSize}
                        min={12}
                        max={20}
                        marks={[
                          { value: 12, label: '12px' },
                          { value: 14, label: '14px' },
                          { value: 16, label: '16px' },
                          { value: 18, label: '18px' },
                          { value: 20, label: '20px' },
                        ]}
                        color="violet"
                      />
                    </Box>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Animations</Text>
                        <Text size="xs" c="dimmed">Enable smooth animations and transitions</Text>
                      </Box>
                      <Switch defaultChecked size="md" color="violet" />
                    </Group>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Compact Mode</Text>
                        <Text size="xs" c="dimmed">Reduce spacing for more content on screen</Text>
                      </Box>
                      <Switch size="md" color="violet" />
                    </Group>
                  </Box>

                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="filled" color="violet">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <Stack gap="lg">
                  <Box>
                    <Title order={3} mb="sm">Notifications</Title>
                    <Text size="sm" c="dimmed">Manage how you receive notifications</Text>
                  </Box>
                  <Divider />

                  <Box>
                    <Text size="md" fw={500} mb="md">Notification Channels</Text>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      }}
                    >
                      <Group justify="space-between" mb="md">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconMail size={20} />
                            <Text size="sm" fw={500}>Email Notifications</Text>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Receive important updates and alerts via email
                          </Text>
                        </Box>
                        <Switch
                          checked={notifications.email}
                          onChange={(event) =>
                            setNotifications({ ...notifications, email: event.currentTarget.checked })
                          }
                          size="md"
                          color="violet"
                        />
                      </Group>
                    </Paper>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      }}
                    >
                      <Group justify="space-between" mb="md">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconMessage size={20} />
                            <Text size="sm" fw={500}>Push Notifications</Text>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Get real-time updates on your mobile device
                          </Text>
                        </Box>
                        <Switch
                          checked={notifications.push}
                          onChange={(event) =>
                            setNotifications({ ...notifications, push: event.currentTarget.checked })
                          }
                          size="md"
                          color="violet"
                        />
                      </Group>
                    </Paper>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      }}
                    >
                      <Group justify="space-between">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconDeviceDesktop size={20} />
                            <Text size="sm" fw={500}>Desktop Notifications</Text>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Show browser notifications for important events
                          </Text>
                        </Box>
                        <Switch
                          checked={notifications.desktop}
                          onChange={(event) =>
                            setNotifications({ ...notifications, desktop: event.currentTarget.checked })
                          }
                          size="md"
                          color="violet"
                        />
                      </Group>
                    </Paper>

                    <Divider my="lg" />

                    <Text size="md" fw={500} mb="md">Notification Types</Text>
                    <Stack gap="sm">
                      <Checkbox label="System updates and maintenance" defaultChecked color="violet" />
                      <Checkbox label="Security alerts and warnings" defaultChecked color="violet" />
                      <Checkbox label="Report generation complete" defaultChecked color="violet" />
                      <Checkbox label="User activity and mentions" color="violet" />
                      <Checkbox label="Marketing and promotional emails" color="violet" />
                      <Checkbox label="Weekly summary reports" defaultChecked color="violet" />
                    </Stack>
                  </Box>

                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="filled" color="violet">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <Stack gap="lg">
                  <Box>
                    <Title order={3} mb="sm">Security & Privacy</Title>
                    <Text size="sm" c="dimmed">Manage your security settings and privacy preferences</Text>
                  </Box>
                  <Divider />

                  <Box>
                    <Text size="md" fw={500} mb="md">Security</Text>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                        border: `1px solid ${theme.colors.green[5]}`,
                      }}
                    >
                      <Group justify="space-between">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconShieldCheck size={20} color={theme.colors.green[6]} />
                            <Text size="sm" fw={500}>Two-Factor Authentication</Text>
                            <Badge color="green" variant="light" size="sm">Recommended</Badge>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Add an extra layer of security to your account
                          </Text>
                        </Box>
                        <Button variant="light" color="green" size="sm">
                          Enable 2FA
                        </Button>
                      </Group>
                    </Paper>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      }}
                    >
                      <Group justify="space-between">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconKey size={20} />
                            <Text size="sm" fw={500}>Password</Text>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Last changed 30 days ago • Strength: Strong
                          </Text>
                        </Box>
                        <Button variant="light" size="sm">
                          Change Password
                        </Button>
                      </Group>
                    </Paper>

                    <Paper
                      p="md"
                      radius="md"
                      mb="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      }}
                    >
                      <Group justify="space-between">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs">
                            <IconDevices size={20} />
                            <Text size="sm" fw={500}>Active Sessions</Text>
                            <Badge variant="light" size="sm">3 devices</Badge>
                          </Group>
                          <Text size="xs" c="dimmed" mt="xs">
                            Manage devices where you're signed in
                          </Text>
                        </Box>
                        <Button variant="light" size="sm">
                          Manage Sessions
                        </Button>
                      </Group>
                    </Paper>

                    <Divider my="lg" />

                    <Text size="md" fw={500} mb="md">Privacy</Text>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Profile Visibility</Text>
                        <Text size="xs" c="dimmed">Control who can see your profile information</Text>
                      </Box>
                      <Select
                        data={['Public', 'Private', 'Team Only']}
                        defaultValue="Team Only"
                        style={{ width: 150 }}
                      />
                    </Group>

                    <Group justify="space-between" mb="md">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Data Sharing</Text>
                        <Text size="xs" c="dimmed">Share anonymous usage data to help improve the product</Text>
                      </Box>
                      <Switch size="md" color="violet" />
                    </Group>

                    <Group justify="space-between">
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" fw={500} mb="xs">Activity Status</Text>
                        <Text size="xs" c="dimmed">Show when you're active to other team members</Text>
                      </Box>
                      <Switch defaultChecked size="md" color="violet" />
                    </Group>
                  </Box>

                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="filled" color="violet">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <Stack gap="lg">
                  <Box>
                    <Title order={3} mb="sm">Account</Title>
                    <Text size="sm" c="dimmed">Manage your account information</Text>
                  </Box>
                  <Divider />

                  <Box>
                    <Text size="md" fw={500} mb="md">Profile Information</Text>

                    <Grid gutter="md" mb="lg">
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="First Name"
                          placeholder="John"
                          defaultValue="John"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Last Name"
                          placeholder="Doe"
                          defaultValue="Doe"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Username"
                          placeholder="johndoe"
                          defaultValue="johndoe"
                          leftSection={<IconUser size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Email"
                          placeholder="john@example.com"
                          defaultValue="john@example.com"
                          leftSection={<IconMail size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Bio"
                          placeholder="Tell us about yourself"
                          defaultValue="Product designer passionate about creating beautiful experiences"
                        />
                      </Grid.Col>
                    </Grid>

                    <Divider my="lg" />

                    <Text size="md" fw={500} mb="md" c="red">Danger Zone</Text>

                    <Paper
                      p="md"
                      radius="md"
                      style={{
                        backgroundColor: colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.red[0],
                        border: `1px solid ${theme.colors.red[3]}`,
                      }}
                    >
                      <Group justify="space-between">
                        <Box style={{ flex: 1 }}>
                          <Text size="sm" fw={500} c="red">Delete Account</Text>
                          <Text size="xs" c="dimmed" mt="xs">
                            Permanently delete your account and all associated data
                          </Text>
                        </Box>
                        <Button color="red" variant="light" size="sm">
                          Delete Account
                        </Button>
                      </Group>
                    </Paper>
                  </Box>

                  <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="light">Cancel</Button>
                    <Button variant="filled" color="violet">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};