import {
  Stack,
  Card,
  Text,
  Group,
  Box,
  Title,
  Badge,
  Grid,
  Button,
  Progress,
  ActionIcon,
  Table,
  ThemeIcon,
  Switch,
  Menu,
  Tabs,
} from '@mantine/core';
import {
  IconDatabase,
  IconCloud,
  IconApi,
  IconFileSpreadsheet,
  IconBrandMysql,
  IconBrandMongodb,
  IconBrandAws,
  IconBrandGoogleAnalytics,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconDots,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconDownload,
  IconTrash,
  IconEdit,
} from '@tabler/icons-react';
import { useState } from 'react';

const dataSources = [
  {
    id: 1,
    name: 'Production Database',
    type: 'MySQL',
    icon: IconBrandMysql,
    status: 'connected',
    lastSync: '2 minutes ago',
    records: '1.2M',
    size: '4.8 GB',
    health: 100,
    autoSync: true,
    color: '#00758f',
  },
  {
    id: 2,
    name: 'Analytics MongoDB',
    type: 'MongoDB',
    icon: IconBrandMongodb,
    status: 'connected',
    lastSync: '15 minutes ago',
    records: '850K',
    size: '3.2 GB',
    health: 95,
    autoSync: true,
    color: '#4db33d',
  },
  {
    id: 3,
    name: 'AWS S3 Bucket',
    type: 'Cloud Storage',
    icon: IconBrandAws,
    status: 'syncing',
    lastSync: 'In progress',
    records: '45K',
    size: '12.5 GB',
    health: 88,
    autoSync: false,
    color: '#ff9900',
  },
  {
    id: 4,
    name: 'Google Analytics',
    type: 'API',
    icon: IconBrandGoogleAnalytics,
    status: 'error',
    lastSync: '2 hours ago',
    records: '125K',
    size: '450 MB',
    health: 0,
    autoSync: true,
    color: '#f57c00',
  },
  {
    id: 5,
    name: 'Sales CSV Import',
    type: 'File Upload',
    icon: IconFileSpreadsheet,
    status: 'disconnected',
    lastSync: '1 day ago',
    records: '12K',
    size: '25 MB',
    health: 75,
    autoSync: false,
    color: '#10b981',
  },
];

const apiEndpoints = [
  { name: '/api/users', method: 'GET', calls: '12,450', latency: '45ms', status: 'active' },
  { name: '/api/transactions', method: 'POST', calls: '8,320', latency: '120ms', status: 'active' },
  { name: '/api/analytics', method: 'GET', calls: '25,100', latency: '85ms', status: 'active' },
  { name: '/api/reports', method: 'GET', calls: '3,200', latency: '250ms', status: 'slow' },
  { name: '/api/export', method: 'POST', calls: '1,050', latency: '1.2s', status: 'slow' },
];

const SourceCard = ({ source }: { source: any }) => {
  const Icon = source.icon;
  const statusColor =
    source.status === 'connected' ? 'green' :
    source.status === 'syncing' ? 'blue' :
    source.status === 'error' ? 'red' : 'gray';

  return (
    <Card shadow="sm" padding="lg" radius="md">
      <Group justify="space-between" mb="md">
        <Group>
          <ThemeIcon size="xl" radius="md" variant="light" color={statusColor}>
            <Icon size={28} />
          </ThemeIcon>
          <Box>
            <Text size="lg" fw={600}>{source.name}</Text>
            <Badge variant="light" color={statusColor} size="sm">
              {source.status}
            </Badge>
          </Box>
        </Group>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconRefresh size={14} />}>
              Sync Now
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Configure
            </Menu.Item>
            <Menu.Item leftSection={<IconEdit size={14} />}>
              Edit Connection
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
              Remove
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Stack gap="xs">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Type</Text>
          <Text size="sm" fw={500}>{source.type}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Last Sync</Text>
          <Text size="sm" fw={500}>{source.lastSync}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Records</Text>
          <Text size="sm" fw={500}>{source.records}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Storage</Text>
          <Text size="sm" fw={500}>{source.size}</Text>
        </Group>
      </Stack>

      <Box mt="md">
        <Group justify="space-between" mb="xs">
          <Text size="xs" c="dimmed">Health Score</Text>
          <Text size="xs" fw={600}>{source.health}%</Text>
        </Group>
        <Progress
          value={source.health}
          color={source.health > 80 ? 'green' : source.health > 50 ? 'yellow' : 'red'}
          size="sm"
          radius="xl"
        />
      </Box>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">Auto-sync</Text>
        <Switch checked={source.autoSync} size="sm" />
      </Group>
    </Card>
  );
};

export const DataSourcesPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('sources');

  return (
    <Box style={{ width: '100%', maxWidth: '100%' }}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Box>
            <Title order={2} mb="xs">Data Sources</Title>
            <Text c="dimmed" size="sm">Manage your data connections and integrations</Text>
          </Box>
          <Group>
            <Button leftSection={<IconRefresh size={18} />} variant="light">
              Sync All
            </Button>
            <Button leftSection={<IconPlus size={18} />} variant="gradient" gradient={{ from: 'violet', to: 'grape' }}>
              Add Data Source
            </Button>
          </Group>
        </Group>

        {/* Overview Stats */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="md" radius="md">
              <Group justify="space-between">
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase">Total Sources</Text>
                  <Text size="xl" fw={700}>5</Text>
                </Box>
                <ThemeIcon size="xl" radius="md" variant="light" color="violet">
                  <IconDatabase size={24} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="md" radius="md">
              <Group justify="space-between">
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase">Active Connections</Text>
                  <Text size="xl" fw={700}>3</Text>
                </Box>
                <ThemeIcon size="xl" radius="md" variant="light" color="green">
                  <IconCheck size={24} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="md" radius="md">
              <Group justify="space-between">
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase">Total Records</Text>
                  <Text size="xl" fw={700}>2.4M</Text>
                </Box>
                <ThemeIcon size="xl" radius="md" variant="light" color="cyan">
                  <IconFileSpreadsheet size={24} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="md" radius="md">
              <Group justify="space-between">
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase">Storage Used</Text>
                  <Text size="xl" fw={700}>21.5 GB</Text>
                </Box>
                <ThemeIcon size="xl" radius="md" variant="light" color="yellow">
                  <IconCloud size={24} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="sources" leftSection={<IconDatabase size={16} />}>
              Data Sources
            </Tabs.Tab>
            <Tabs.Tab value="api" leftSection={<IconApi size={16} />}>
              API Endpoints
            </Tabs.Tab>
            <Tabs.Tab value="logs" leftSection={<IconAlertCircle size={16} />}>
              Sync Logs
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="sources" pt="md">
            <Grid>
              {dataSources.map((source) => (
                <Grid.Col key={source.id} span={{ base: 12, sm: 6, lg: 4 }}>
                  <SourceCard source={source} />
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="api" pt="md">
            <Card shadow="sm" padding="lg" radius="md">
              <Group justify="space-between" mb="md">
                <Text size="lg" fw={600}>API Endpoints</Text>
                <Button variant="light" size="sm" leftSection={<IconDownload size={16} />}>
                  Export API Docs
                </Button>
              </Group>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Endpoint</Table.Th>
                    <Table.Th>Method</Table.Th>
                    <Table.Th>Calls (24h)</Table.Th>
                    <Table.Th>Avg Latency</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {apiEndpoints.map((endpoint) => (
                    <Table.Tr key={endpoint.name}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{endpoint.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {endpoint.method}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{endpoint.calls}</Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          color={endpoint.status === 'slow' ? 'yellow' : 'green'}
                          size="sm"
                        >
                          {endpoint.latency}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="dot"
                          color={endpoint.status === 'active' ? 'green' : 'yellow'}
                          size="sm"
                        >
                          {endpoint.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" size="sm">
                            <IconSettings size={16} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" size="sm">
                            <IconRefresh size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="logs" pt="md">
            <Card shadow="sm" padding="lg" radius="md">
              <Text size="lg" fw={600} mb="md">Recent Sync Activity</Text>
              <Stack gap="xs">
                <Group justify="space-between" p="xs" style={{ borderLeft: '3px solid #10b981' }}>
                  <Group>
                    <IconCheck size={18} color="#10b981" />
                    <Box>
                      <Text size="sm" fw={500}>Production Database synced successfully</Text>
                      <Text size="xs" c="dimmed">125,000 records updated • 2 minutes ago</Text>
                    </Box>
                  </Group>
                </Group>
                <Group justify="space-between" p="xs" style={{ borderLeft: '3px solid #10b981' }}>
                  <Group>
                    <IconCheck size={18} color="#10b981" />
                    <Box>
                      <Text size="sm" fw={500}>Analytics MongoDB synced successfully</Text>
                      <Text size="xs" c="dimmed">85,000 records updated • 15 minutes ago</Text>
                    </Box>
                  </Group>
                </Group>
                <Group justify="space-between" p="xs" style={{ borderLeft: '3px solid #3b82f6' }}>
                  <Group>
                    <IconRefresh size={18} color="#3b82f6" />
                    <Box>
                      <Text size="sm" fw={500}>AWS S3 Bucket sync in progress</Text>
                      <Text size="xs" c="dimmed">Processing 45,000 records • Started 5 minutes ago</Text>
                    </Box>
                  </Group>
                </Group>
                <Group justify="space-between" p="xs" style={{ borderLeft: '3px solid #ef4444' }}>
                  <Group>
                    <IconX size={18} color="#ef4444" />
                    <Box>
                      <Text size="sm" fw={500}>Google Analytics sync failed</Text>
                      <Text size="xs" c="dimmed">Authentication error • 2 hours ago</Text>
                    </Box>
                  </Group>
                  <Button size="xs" variant="light" color="red">Retry</Button>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Box>
  );
};