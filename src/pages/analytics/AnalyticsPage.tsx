import { Grid, Card, Text, Group, Stack, Badge, Box, Title, SegmentedControl, Select } from '@mantine/core';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from 'react';

const pieData = [
  { name: 'Desktop', value: 45, color: '#7c3aed' },
  { name: 'Mobile', value: 30, color: '#06b6d4' },
  { name: 'Tablet', value: 15, color: '#10b981' },
  { name: 'Smart TV', value: 10, color: '#f59e0b' },
];

const radarData = [
  { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
  { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
  { subject: 'User Experience', A: 86, B: 130, fullMark: 150 },
  { subject: 'Features', A: 99, B: 100, fullMark: 150 },
  { subject: 'Support', A: 85, B: 90, fullMark: 150 },
  { subject: 'Value', A: 65, B: 85, fullMark: 150 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
  { x: 130, y: 350, z: 350 },
  { x: 160, y: 320, z: 300 },
  { x: 180, y: 380, z: 450 },
];

const conversionData = [
  { name: 'Landing', visitors: 10000, color: '#7c3aed' },
  { name: 'Product View', visitors: 7500, color: '#8b5cf6' },
  { name: 'Add to Cart', visitors: 4500, color: '#a78bfa' },
  { name: 'Checkout', visitors: 2500, color: '#c4b5fd' },
  { name: 'Purchase', visitors: 1200, color: '#ddd6fe' },
];

export const AnalyticsPage = () => {
  const [period, setPeriod] = useState('week');
  const [metric, setMetric] = useState('revenue');

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-end">
        <Box>
          <Title order={2} mb="xs">Analytics Dashboard</Title>
          <Text c="dimmed" size="sm">Comprehensive insights into your business metrics</Text>
        </Box>
        <Group>
          <Select
            value={metric}
            onChange={(value) => setMetric(value || 'revenue')}
            data={[
              { value: 'revenue', label: 'Revenue' },
              { value: 'users', label: 'Users' },
              { value: 'engagement', label: 'Engagement' },
            ]}
            style={{ width: 140 }}
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
        </Group>
      </Group>

      <Grid>
        {/* Device Distribution */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Text size="lg" fw={600} mb="md">Device Distribution</Text>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        {/* Performance Metrics */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Text size="lg" fw={600} mb="md">Performance Comparison</Text>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" stroke="#666" />
                <PolarRadiusAxis stroke="#666" />
                <Radar name="Product A" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                <Radar name="Product B" dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        {/* Conversion Funnel */}
        <Grid.Col span={{ base: 12 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={600}>Conversion Funnel</Text>
              <Badge variant="light">12% overall conversion</Badge>
            </Group>
            <Stack gap="sm">
              {conversionData.map((stage, index) => (
                <Box key={stage.name}>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500}>{stage.name}</Text>
                    <Text size="sm" c="dimmed">{stage.visitors.toLocaleString()} visitors</Text>
                  </Group>
                  <Box
                    style={{
                      height: 40,
                      background: stage.color,
                      borderRadius: 8,
                      width: `${(stage.visitors / conversionData[0].visitors) * 100}%`,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 16,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Text size="sm" c="white" fw={600}>
                      {((stage.visitors / conversionData[0].visitors) * 100).toFixed(1)}%
                    </Text>
                  </Box>
                  {index < conversionData.length - 1 && (
                    <Text size="xs" c="dimmed" mt="xs">
                      {((1 - conversionData[index + 1].visitors / stage.visitors) * 100).toFixed(1)}% drop-off
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* User Engagement Scatter */}
        <Grid.Col span={{ base: 12 }}>
          <Card shadow="sm" padding="lg" radius="md">
            <Text size="lg" fw={600} mb="md">User Engagement Analysis</Text>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" dataKey="x" name="Session Duration" stroke="#666" />
                <YAxis type="number" dataKey="y" name="Page Views" stroke="#666" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Users" data={scatterData} fill="#7c3aed" />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};