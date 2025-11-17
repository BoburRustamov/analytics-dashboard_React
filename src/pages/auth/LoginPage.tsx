import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Paper,
  Container,
  Stack,
  Alert,
  Box,
} from '@mantine/core';
import { IconAlertCircle, IconAnalyze, IconUser, IconLock } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';
import { login, $isLoading, $error, $isAuthenticated } from '../../entities/auth/model';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, error, isAuthenticated] = useUnit([$isLoading, $error, $isAuthenticated]);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validate: {
      username: (value) => (value.length < 1 ? 'Username is required' : null),
      password: (value) => (value.length < 1 ? 'Password is required' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    login({ username: values.username, password: values.password });
  };

  // Navigate to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px',
          left: '-200px',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-150px',
          right: '-150px',
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      <Container size={420}>
        <Paper
          radius="lg"
          p="xl"
          shadow="xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack gap="lg">
            <Box ta="center">
              <IconAnalyze size={48} color="#667eea" stroke={1.5} />
              <Title order={2} mt="md" style={{ color: '#1a1a1a' }}>
                Analytics Dashboard
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                Welcome back! Please login to your account
              </Text>
            </Box>

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
                {error}
              </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  required
                  label="Username"
                  placeholder="Enter your username"
                  leftSection={<IconUser size={16} />}
                  radius="md"
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Enter your password"
                  leftSection={<IconLock size={16} />}
                  radius="md"
                  {...form.getInputProps('password')}
                />

                <Checkbox
                  label="Remember me"
                  {...form.getInputProps('remember', { type: 'checkbox' })}
                />

                <Button
                  fullWidth
                  loading={isLoading}
                  type="submit"
                  radius="md"
                  size="md"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <Text ta="center" size="xs" c="dimmed" mt="md">
              This is a demo application. Use any username and password to login.
            </Text>
          </Stack>
        </Paper>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          75% { transform: translateY(20px) rotate(-5deg); }
        }
      `}</style>
    </Box>
  );
};