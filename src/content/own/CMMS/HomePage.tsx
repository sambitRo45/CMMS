import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';
import { ModuleCard, SummaryCard } from './components';
import { cmmsModules, cmmsSummaryCards } from './mockData';

function HomePage() {
  const navigate = useNavigate();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  return (
    <>
      <Helmet>
        <title>CMMS Home</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h2">Welcome back, Admin</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Here is what is happening with your operations today.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
              lg: 'repeat(5, minmax(0, 1fr))'
            },
            gap: 2,
            mb: 3
          }}
        >
          {cmmsSummaryCards.map((item) => (
            <Box key={item.id}>
              <SummaryCard item={item} />
            </Box>
          ))}
        </Box>

        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 3 }}>
          <Typography variant="h2">Explore Modules</Typography>
          <Typography color="text.secondary">
            Powerful modules to manage your operations end to end.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {cmmsModules.map((module) => (
            <Grid item xs={12} sm={6} lg={3} key={module.id}>
              <ModuleCard
                module={module}
                onOpen={() => navigate(module.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;
