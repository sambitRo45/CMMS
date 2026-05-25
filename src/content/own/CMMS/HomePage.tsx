import {
  useContext,
  useEffect,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material';

import Inventory2TwoToneIcon
from '@mui/icons-material/Inventory2TwoTone';

import { useNavigate }
from 'react-router-dom';

import axios from 'src/utils/axios';

import { TitleContext }
from 'src/contexts/TitleContext';

import {
  ModuleCard,
  SummaryCard
} from './components';

import { cmmsModules }
from './mockData';

function HomePage() {

  const navigate = useNavigate();

  const { setTitle } =
    useContext(TitleContext);

  // STATES
  const [loading, setLoading] =
    useState(true);

  const [totalProducts,
    setTotalProducts] =
    useState<number>(0);

  // PAGE TITLE
  useEffect(() => {

    setTitle('Home');

  }, [setTitle]);

  // FETCH DATA
  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          setLoading(true);

          const response =
            await axios.get(
              'http://localhost:8080/api/dashboard/summary'
            );

          console.log(
            'DASHBOARD RESPONSE:',
            response.data
          );

          setTotalProducts(
            response.data.totalProducts || 0
          );

        } catch (error) {

          console.error(
            'DASHBOARD ERROR:',
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchDashboard();

  }, []);

  // LOADING
  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >

        <Stack
          spacing={2}
          alignItems="center"
        >

          <CircularProgress />

          <Typography>
            Loading dashboard...
          </Typography>

        </Stack>

      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          CMMS Home
        </title>
      </Helmet>

      <Box
        p={{
          xs: 2,
          md: 4
        }}
      >

        {/* HEADER */}
        <Stack
          direction={{
            xs: 'column',
            md: 'row'
          }}
          justifyContent="space-between"
          alignItems={{
            xs: 'flex-start',
            md: 'center'
          }}
          spacing={2}
          sx={{ mb: 3 }}
        >

          <Box>

            <Typography variant="h2">
              Welcome back, Admin
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Here is what is happening
              with your operations today.
            </Typography>

          </Box>

        </Stack>

        {/* SUMMARY SECTION */}
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },

            gap: 2,

            mb: 4
          }}
        >

          <SummaryCard
            item={{
              id: 'products',
              label: 'Total Products',
              value: totalProducts.toString(),
              trend: '+12%',
              color: '#1976d2',
              icon:
                Inventory2TwoToneIcon
            }}
          />

        </Box>

        {/* MODULE TITLE */}
        <Stack
          spacing={1}
          alignItems="center"
          textAlign="center"
          sx={{ mb: 3 }}
        >

          <Typography variant="h2">
            Explore Modules
          </Typography>

          <Typography
            color="text.secondary"
          >
            Powerful modules to manage
            your operations end to end.
          </Typography>

        </Stack>

        {/* MODULE GRID */}
        <Grid
          container
          spacing={2}
        >

          {cmmsModules.map(
            (module) => (

              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                key={module.id}
              >

                <ModuleCard
                  module={module}
                  onOpen={() =>
                    navigate(
                      module.path
                    )
                  }
                />

              </Grid>
            )
          )}

        </Grid>

      </Box>
    </>
  );
}

export default HomePage;