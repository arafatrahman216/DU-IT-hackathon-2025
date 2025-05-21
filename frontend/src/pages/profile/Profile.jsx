import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Button,
  Chip,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  WorkOutline as WorkIcon,
  LocationOn as LocationIcon,
  DateRange as DateIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // TODO: Handle error (show message to user)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        py: 4,
      }}
    >
      <Container>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(23, 25, 35, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Header Section */}
          <Box sx={{ position: 'relative', mb: 4 }}>
            {/* Cover Image */}
            <Box
              sx={{
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                mb: -12,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, #1a237e, #0288d1)',
                  opacity: 0.7,
                }}
              />
            </Box>

            {/* Profile Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                px: 3,
                pt: 3,
                position: 'relative',
              }}
            >
              <Avatar
                src={user?.avatar || '/default-avatar.png'}
                sx={{
                  width: 150,
                  height: 150,
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
              <Box sx={{ ml: 3, mb: 2 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {user?.name || 'User Name'}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {user?.title || 'Student'}
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  ml: 'auto',
                  mb: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>

          {/* Main Content */}
          <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper
                    sx={{
                      p: 3,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    >
                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                      Personal Information
                    </Typography>
                    <Box sx={{ '& > div': { mb: 2 } }}>
                      <InfoItem
                      icon={<EmailIcon />}
                      label="Email"
                      value={user?.email || 'email@example.com'}
                      />
                      <InfoItem
                      icon={<LocationIcon />}
                      label="Location"
                      value={user?.location || 'Not specified'}
                      />
                      <InfoItem
                      icon={<DateIcon />}
                      label="Joined"
                      value={
                        user?.created_at
                        ? new Date(user.created_at).toDateString()
                        : 'Not specified'
                      }
                      />
                    </Box>
                    </Paper>
                  </Grid>

                  {/* Right Column - Education & Skills */}
            <Grid item xs={12} md={8}>
              {/* Education Section */}
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Education
                </Typography>
                <Box sx={{ '& > div': { mb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        {user?.education?.degree || 'Degree'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {user?.education?.school || 'School Name'} • {user?.education?.year || 'Year'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Skills Section */}
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {(user?.skills || ['React', 'Node.js', 'JavaScript']).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

// Helper component for displaying info items
const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box
      sx={{
        mr: 2,
        color: 'rgba(255,255,255,0.7)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'white' }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

// Loading skeleton component
const ProfileSkeleton = () => (
  <Box
    sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      py: 4,
    }}
  >
    <Container>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(23, 25, 35, 0.9)',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={150} height={150} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={150} />
            </Box>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={100} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  </Box>
);

export default Profile; 