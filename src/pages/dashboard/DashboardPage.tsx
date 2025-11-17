import { Grid, Card, Text, Group, Stack, RingProgress, Progress, Badge, Box, Title } from '@mantine/core';
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconUsers,
  IconEye,
  IconShoppingCart,
  IconCoin,
} from '@tabler/icons-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const trafficData = [
  { name: 'Mon', desktop: 4000, mobile: 2400 },
  { name: 'Tue', desktop: 3000, mobile: 1398 },
  { name: 'Wed', desktop: 2000, mobile: 9800 },
  { name: 'Thu', desktop: 2780, mobile: 3908 },
  { name: 'Fri', desktop: 1890, mobile: 4800 },
  { name: 'Sat', desktop: 2390, mobile: 3800 },
  { name: 'Sun', desktop: 3490, mobile: 4300 },
];

const StatCard = ({ icon, label, value, change, color }: any) => (
  <Card shadow="sm" padding="lg" radius="md">
    <Group justify="space-between" mb="xs">
      <Box
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Badge
        variant="light"
        color={change >= 0 ? 'green' : 'red'}
        leftSection={change >= 0 ? <IconArrowUpRight size={14} /> : <IconArrowDownRight size={14} />}
      >
        {Math.abs(change)}%
      </Badge>
    </Group>
    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
      {label}
    </Text>
    <Text size="xl" fw={700} mt="xs">
      {value}
    </Text>
  </Card>
);

export const DashboardPage = () => {
  return (
    <Stack gap="lg">
      <Box>
        <Title order={2} mb="xs">Dashboard Overview</Title>
        <Text c="dimmed" size="sm">Welcome back! Here's what's happening with your business today.</Text>
      </Box>

      {/* Stats Grid */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={<IconCoin size={24} color="#7c3aed" />}
            label="Total Revenue"
            value="$54,239"
            change={12.5}
            color="#7c3aed"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={<IconUsers size={24} color="#06b6d4" />}
            label="Total Users"
            value="8,549"
            change={8.3}
            color="#06b6d4"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={<IconShoppingCart size={24} color="#10b981" />}
            label="Total Orders"
            value="2,457"
            change={-3.2}
            color="#10b981"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={<IconEye size={24} color="#f59e0b" />}
            label="Page Views"
            value="45.2K"
            change={15.7}
            color="#f59e0b"
          />
        </Grid.Col>
      </Grid>

      {/* Charts Grid */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={600}>Revenue Overview</Text>
              <Badge variant="light">Last 7 months</Badge>
            </Group>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7c3aed"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" h="100%">
            <Text size="lg" fw={600} mb="md">Goal Progress</Text>
            <Stack gap="xl" align="center" justify="center" style={{ height: 'calc(100% - 40px)' }}>
              <RingProgress
                size={180}
                thickness={20}
                sections={[
                  { value: 75, color: '#7c3aed' },
                  { value: 25, color: '#e0e0e0' },
                ]}
                label={
                  <Box ta="center">
                    <Text size="xl" fw={700}>75%</Text>
                    <Text size="xs" c="dimmed">Complete</Text>
                  </Box>
                }
              />
              <Stack gap="sm" w="100%">
                <Group justify="space-between">
                  <Text size="sm">Sales Target</Text>
                  <Text size="sm" fw={600}>$75K / $100K</Text>
                </Group>
                <Progress value={75} color="violet" size="sm" radius="md" />
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Traffic Chart */}
      <Card shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>Traffic Analytics</Text>
          <Group gap="sm">
            <Badge variant="dot" color="violet">Desktop</Badge>
            <Badge variant="dot" color="cyan">Mobile</Badge>
          </Group>
        </Group>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="desktop" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="mobile" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Stack>
  );
};