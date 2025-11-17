import {
  Stack,
  Card,
  Text,
  Group,
  Box,
  Title,
  Badge,
  Grid,
  Progress,
  Select,
  SegmentedControl,
  Table,
  ActionIcon,
  Button,
} from '@mantine/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCash,
  IconReceipt,
  IconWallet,
  IconCreditCard,
  IconDownload,
  IconFilter,
} from '@tabler/icons-react';
import { useState } from 'react';

const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 12000, expenses: 33000 },
  { month: 'Feb', revenue: 52000, profit: 15000, expenses: 37000 },
  { month: 'Mar', revenue: 48000, profit: 13000, expenses: 35000 },
  { month: 'Apr', revenue: 61000, profit: 18000, expenses: 43000 },
  { month: 'May', revenue: 55000, profit: 16000, expenses: 39000 },
  { month: 'Jun', revenue: 67000, profit: 22000, expenses: 45000 },
  { month: 'Jul', revenue: 72000, profit: 25000, expenses: 47000 },
  { month: 'Aug', revenue: 69000, profit: 23000, expenses: 46000 },
  { month: 'Sep', revenue: 75000, profit: 27000, expenses: 48000 },
  { month: 'Oct', revenue: 78000, profit: 29000, expenses: 49000 },
  { month: 'Nov', revenue: 82000, profit: 31000, expenses: 51000 },
  { month: 'Dec', revenue: 89000, profit: 35000, expenses: 54000 },
];

const revenueBySource = [
  { name: 'Direct Sales', value: 45000, color: '#7c3aed' },
  { name: 'Online Store', value: 38000, color: '#06b6d4' },
  { name: 'Partner Sales', value: 25000, color: '#10b981' },
  { name: 'Subscriptions', value: 18000, color: '#f59e0b' },
  { name: 'Licensing', value: 12000, color: '#ef4444' },
];

const recentTransactions = [
  { id: 'TRX001', customer: 'Acme Corp', amount: 12500, date: '2024-04-15', status: 'Completed', type: 'Credit' },
  { id: 'TRX002', customer: 'Tech Solutions', amount: 8750, date: '2024-04-14', status: 'Completed', type: 'PayPal' },
  { id: 'TRX003', customer: 'Global Industries', amount: 15000, date: '2024-04-14', status: 'Pending', type: 'Bank' },
  { id: 'TRX004', customer: 'StartUp Inc', amount: 3200, date: '2024-04-13', status: 'Completed', type: 'Credit' },
  { id: 'TRX005', customer: 'Enterprise Co', amount: 22000, date: '2024-04-13', status: 'Completed', type: 'Wire' },
];

const StatCard = ({ icon, title, value, change, changeType, color }: any) => (
  <Card shadow="sm" padding="lg" radius="md">
    <Group justify="space-between" mb="md">
      <Box
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
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
        color={changeType === 'up' ? 'green' : 'red'}
        leftSection={changeType === 'up' ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
      >
        {change}
      </Badge>
    </Group>
    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
      {title}
    </Text>
    <Text size="xl" fw={700} mt="xs">
      {value}
    </Text>
  </Card>
);

export const RevenuePage = () => {
  const [period, setPeriod] = useState('month');
  const [revenueType, setRevenueType] = useState('all');

  return (
    <Box style={{ width: '100%', maxWidth: '100%' }}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Box>
            <Title order={2} mb="xs">Revenue Analytics</Title>
            <Text c="dimmed" size="sm">Track your revenue, profit, and financial performance</Text>
          </Box>
          <Group>
            <Select
              value={revenueType}
              onChange={(value) => setRevenueType(value || 'all')}
              data={[
                { value: 'all', label: 'All Revenue' },
                { value: 'recurring', label: 'Recurring' },
                { value: 'one-time', label: 'One-time' },
              ]}
              leftSection={<IconFilter size={16} />}
            />
            <SegmentedControl
              value={period}
              onChange={setPeriod}
              data={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
              ]}
            />
            <ActionIcon variant="light" size="lg">
              <IconDownload size={18} />
            </ActionIcon>
          </Group>
        </Group>

        {/* Revenue Stats */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconCash size={24} color="#7c3aed" />}
              title="Total Revenue"
              value="$758,000"
              change="+12.5%"
              changeType="up"
              color="#7c3aed"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconWallet size={24} color="#06b6d4" />}
              title="Net Profit"
              value="$265,300"
              change="+8.2%"
              changeType="up"
              color="#06b6d4"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconReceipt size={24} color="#10b981" />}
              title="Expenses"
              value="$492,700"
              change="-3.4%"
              changeType="down"
              color="#10b981"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<IconCreditCard size={24} color="#f59e0b" />}
              title="Avg Transaction"
              value="$1,842"
              change="+5.7%"
              changeType="up"
              color="#f59e0b"
            />
          </Grid.Col>
        </Grid>

        {/* Revenue Chart */}
        <Card shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>Revenue Overview</Text>
            <Group gap="xs">
              <Badge variant="dot" color="violet">Revenue</Badge>
              <Badge variant="dot" color="green">Profit</Badge>
              <Badge variant="dot" color="red">Expenses</Badge>
            </Group>
          </Group>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <ChartTooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Grid>
          {/* Revenue by Source */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Text size="lg" fw={600} mb="md">Revenue by Source</Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBySource}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {revenueBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack gap="xs" mt="md">
                {revenueBySource.map((source) => (
                  <Group key={source.name} justify="space-between">
                    <Group gap="xs">
                      <Box
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          backgroundColor: source.color,
                        }}
                      />
                      <Text size="sm">{source.name}</Text>
                    </Group>
                    <Text size="sm" fw={600}>
                      ${source.value.toLocaleString()}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Growth Metrics */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Text size="lg" fw={600} mb="md">Growth Metrics</Text>
              <Stack gap="md">
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Q1 Target Achievement</Text>
                    <Text size="sm" fw={600}>82%</Text>
                  </Group>
                  <Progress value={82} color="violet" size="lg" radius="xl" />
                </Box>
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">YoY Growth</Text>
                    <Text size="sm" fw={600}>124%</Text>
                  </Group>
                  <Progress value={124} color="cyan" size="lg" radius="xl" />
                </Box>
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Profit Margin</Text>
                    <Text size="sm" fw={600}>35%</Text>
                  </Group>
                  <Progress value={35} color="green" size="lg" radius="xl" />
                </Box>
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Customer Retention</Text>
                    <Text size="sm" fw={600}>91%</Text>
                  </Group>
                  <Progress value={91} color="yellow" size="lg" radius="xl" />
                </Box>
              </Stack>

              <Grid mt="lg">
                <Grid.Col span={6}>
                  <Box>
                    <Text size="xs" c="dimmed">MRR</Text>
                    <Text size="xl" fw={700}>$125,400</Text>
                    <Badge color="green" variant="light" size="sm">+15.2%</Badge>
                  </Box>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Box>
                    <Text size="xs" c="dimmed">ARR</Text>
                    <Text size="xl" fw={700}>$1,504,800</Text>
                    <Badge color="green" variant="light" size="sm">+18.7%</Badge>
                  </Box>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Recent Transactions */}
        <Card shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>Recent Transactions</Text>
            <Button variant="light" size="sm">View All</Button>
          </Group>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Transaction ID</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Payment</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentTransactions.map((transaction) => (
                <Table.Tr key={transaction.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>{transaction.id}</Text>
                  </Table.Td>
                  <Table.Td>{transaction.customer}</Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600} c="green">
                      ${transaction.amount.toLocaleString()}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">{transaction.date}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" size="sm">{transaction.type}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="dot"
                      color={transaction.status === 'Completed' ? 'green' : 'yellow'}
                      size="sm"
                    >
                      {transaction.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </Box>
  );
};