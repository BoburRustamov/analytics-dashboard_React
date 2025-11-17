import { Stack, Card, Text, Group, Badge, Button, Box, Title, Grid, Progress, Table } from '@mantine/core';
import { IconDownload, IconFileText, IconTrendingUp, IconCalendar } from '@tabler/icons-react';

const reports = [
  {
    id: '1',
    title: 'Q1 Financial Report',
    type: 'Financial',
    date: '2024-04-01',
    size: '2.4 MB',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'User Analytics March',
    type: 'Analytics',
    date: '2024-03-31',
    size: '1.8 MB',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Sales Performance Report',
    type: 'Sales',
    date: '2024-04-15',
    size: '3.1 MB',
    status: 'Processing',
  },
  {
    id: '4',
    title: 'Marketing Campaign Results',
    type: 'Marketing',
    date: '2024-04-10',
    size: '1.2 MB',
    status: 'Completed',
  },
];

const ReportCard = ({ icon, title, value, description, color, progress }: any) => (
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
      <Badge variant="light" color={color}>
        {progress}% Complete
      </Badge>
    </Group>
    <Text size="lg" fw={700} mb="xs">
      {value}
    </Text>
    <Text size="sm" fw={500} mb="xs">
      {title}
    </Text>
    <Text size="xs" c="dimmed" mb="md">
      {description}
    </Text>
    <Progress value={progress} color={color} size="sm" radius="xl" />
  </Card>
);

export const ReportsPage = () => {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">Reports & Documents</Title>
          <Text c="dimmed" size="sm">Generate and download comprehensive business reports</Text>
        </Box>
        <Button leftSection={<IconFileText size={18} />} color="violet">
          Generate New Report
        </Button>
      </Group>

      {/* Report Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <ReportCard
            icon={<IconFileText size={24} color="#7c3aed" />}
            title="Total Reports"
            value="156"
            description="All time generated"
            color="violet"
            progress={100}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <ReportCard
            icon={<IconTrendingUp size={24} color="#06b6d4" />}
            title="This Month"
            value="24"
            description="Reports generated"
            color="cyan"
            progress={75}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <ReportCard
            icon={<IconCalendar size={24} color="#10b981" />}
            title="Scheduled"
            value="8"
            description="Upcoming reports"
            color="green"
            progress={30}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <ReportCard
            icon={<IconDownload size={24} color="#f59e0b" />}
            title="Downloads"
            value="1,245"
            description="Total downloads"
            color="yellow"
            progress={85}
          />
        </Grid.Col>
      </Grid>

      {/* Recent Reports Table */}
      <Card shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>Recent Reports</Text>
          <Button variant="light" size="sm">
            View All
          </Button>
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Report Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {reports.map((report) => (
              <Table.Tr key={report.id}>
                <Table.Td>
                  <Group gap="xs">
                    <IconFileText size={18} />
                    <Text size="sm" fw={500}>
                      {report.title}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" size="sm">
                    {report.type}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {report.date}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{report.size}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge
                    variant="dot"
                    color={report.status === 'Completed' ? 'green' : 'yellow'}
                    size="sm"
                  >
                    {report.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    leftSection={<IconDownload size={14} />}
                    variant="subtle"
                    size="xs"
                    disabled={report.status !== 'Completed'}
                  >
                    Download
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
};