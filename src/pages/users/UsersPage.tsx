import { Stack, Card, Text, Group, Badge, Avatar, ActionIcon, TextInput, Box, Title, Table, Menu } from '@mantine/core';
import { IconSearch, IconFilter, IconDots, IconEdit, IconTrash, IconEye, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=7c3aed&color=fff',
    lastActive: '2 hours ago',
    joinDate: 'Jan 15, 2024',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=06b6d4&color=fff',
    lastActive: '5 minutes ago',
    joinDate: 'Feb 20, 2024',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=10b981&color=fff',
    lastActive: '3 days ago',
    joinDate: 'Mar 10, 2024',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=f59e0b&color=fff',
    lastActive: '1 hour ago',
    joinDate: 'Apr 5, 2024',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson&background=ef4444&color=fff',
    lastActive: '30 minutes ago',
    joinDate: 'May 12, 2024',
  },
];

const roleColors: Record<string, string> = {
  Admin: 'violet',
  Editor: 'blue',
  Viewer: 'gray',
};

const statusColors: Record<string, string> = {
  Active: 'green',
  Inactive: 'red',
  Pending: 'yellow',
};

export const UsersPage = () => {
  const [search, setSearch] = useState('');
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar src={user.avatar} size={40} radius="xl" />
          <div>
            <Text size="sm" fw={500}>
              {user.name}
            </Text>
            <Text size="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={roleColors[user.role]} variant="light">
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={statusColors[user.status]} variant="dot">
          {user.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {user.lastActive}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {user.joinDate}
        </Text>
      </Table.Td>
      <Table.Td>
        <Menu shadow="sm" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEye size={14} />}>View Details</Menu.Item>
            <Menu.Item leftSection={<IconEdit size={14} />}>Edit User</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
              Delete User
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">User Management</Title>
          <Text c="dimmed" size="sm">Manage your team members and their permissions</Text>
        </Box>
        <Group>
          <ActionIcon size="lg" variant="filled" color="violet">
            <IconUserPlus size={20} />
          </ActionIcon>
        </Group>
      </Group>

      <Card shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search users..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ width: 300 }}
          />
          <Group>
            <Badge variant="light" size="lg">
              {filteredUsers.length} users
            </Badge>
            <ActionIcon variant="light" size="lg">
              <IconFilter size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Last Active</Table.Th>
              <Table.Th>Join Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
};