import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  alpha,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';

import { QRCodeSVG } from 'qrcode.react';

import {
  Link as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';

import axios from 'axios';

import { TitleContext } from 'src/contexts/TitleContext';

const tabs = [
  'Product Master Log',
  'Logistics Trail',
  'Maintenance History',
  'Documents',
  'Digital Twin',
  'Audit Trail'
];

function DetailField({
  label,
  value
}: {
  label: string;
  value: any;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          mt: 0.5
        }}
      >
        {value || '-'}
      </Typography>
    </Box>
  );
}

function ProductDetailsPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { productId } = useParams();

  const { setTitle } = useContext(TitleContext);

  const [product, setProduct] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState(0);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        console.log('Fetching product ID:', productId);

        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );

        console.log('API RESPONSE:', response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.error('FETCH ERROR:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    setTitle(product?.productName || 'Product Details');
  }, [product, setTitle]);

  // LOADING
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading product...</Typography>
        </Stack>
      </Box>
    );
  }

  // NOT FOUND
  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h4">
          Product not found
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            navigate('/app/product-lifecycle')
          }
        >
          Back
        </Button>
      </Box>
    );
  }

  const metadata = [
    ['PRODUCT UID', product.productUid],
    ['SERIAL NUMBER', product.productSerialNumber],
    ['VERSION', product.productVersion],
    ['BOM VERSION', product.bomVersion],
    ['BATCH ID', product.manufacturingBatchId],
    ['QC STATUS', product.qcStatus],
    ['LIFECYCLE STAGE', product.lifecycleStage],
    ['CUSTOMER', product.assignedCustomer],
    ['INSTALLATION SITE', product.installationSite],
    ['LOCATION', product.locationGps],
    ['CONTACT', product.contactPerson],
    ['EMAIL', product.email]
  ];

  const technicalFields = [
    ['MODEL NUMBER', product.modelNumber],
    ['PART NUMBER', product.partNumber],
    ['MAC ADDRESS', product.macAddress],
    ['IMEI / MODULE ID', product.imeiModuleId],
    ['HARDWARE VERSION', product.hardwareVersion],
    ['FIRMWARE VERSION', product.firmwareVersion],
    ['RFID TAG ID', product.rfidTagId],
    ['MANUFACTURING DATE', product.manufacturingDate],
    ['ASSEMBLY DATE', product.assemblyDate]
  ];

  return (
    <>
      <Helmet>
        <title>
          {product.productName}
        </title>
      </Helmet>

      <Box
        p={{ xs: 2, md: 4 }}
        sx={{
          backgroundColor: '#f5f7fb',
          minHeight: '100vh'
        }}
      >
        <Stack spacing={3}>

          {/* BREADCRUMB */}
          <Breadcrumbs separator="/">
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/app/home"
            >
              Home
            </Link>

            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/app/product-lifecycle"
            >
              Product Lifecycle Log
            </Link>

            <Typography color="text.primary">
              {product.productUid}
            </Typography>
          </Breadcrumbs>

          {/* BACK BUTTON */}
          <Button
            startIcon={<ArrowBackTwoToneIcon />}
            onClick={() =>
              navigate('/app/product-lifecycle')
            }
            sx={{
              width: 'fit-content',
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            Back to Product List
          </Button>

          {/* TOP CARD */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}
          >
            <CardContent sx={{ p: 4 }}>

              <Grid container spacing={4}>

                {/* LEFT SIDE */}
                <Grid item xs={12} md={3}>

                  <Stack spacing={2}>

                    {/* IMAGE */}
                    
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        border: '1px solid #e5e7eb',
                        p: 2,
                        height: 220,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        component="img"
                        src={
                          product.imageUrl
                            ? `http://localhost:8080/${product.imageUrl}`
                            : 'https://via.placeholder.com/250'
                        }
                        alt={product.productName}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Paper>

                    {/* QR CODE */}
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        border: '1px solid #e5e7eb',
                        p: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <QRCodeSVG
                        value={
                          product.productUid ||
                          'NO_QR'
                        }
                        size={140}
                      />
                    </Paper>

                  </Stack>

                </Grid>

                {/* RIGHT SIDE */}
                <Grid item xs={12} md={9}>

                  <Stack
                    direction={{
                      xs: 'column',
                      md: 'row'
                    }}
                    justifyContent="space-between"
                    spacing={3}
                  >

                    {/* PRODUCT INFO */}
                    <Box>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >

                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 700
                          }}
                        >
                          {product.productName}
                        </Typography>

                        <Chip
                          label={
                            product.productStatus
                          }
                          sx={{
                            backgroundColor:
                              '#4caf50',
                            color: '#fff',
                            fontWeight: 600
                          }}
                        />

                      </Stack>

                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          maxWidth: 700
                        }}
                      >
                        {product.remarks ||
                          'No description available'}
                      </Typography>

                    </Box>

                    {/* DIGITAL TWIN BUTTON */}
                    {product.digitalTwinLink && (
                      <Button
                        variant="outlined"
                        target="_blank"
                        href={
                          product.digitalTwinLink
                        }
                        endIcon={
                          <OpenInNewTwoToneIcon />
                        }
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          height: 'fit-content'
                        }}
                      >
                        Digital Twin
                      </Button>
                    )}

                  </Stack>

                  {/* METADATA */}
                  <Grid
                    container
                    spacing={4}
                    sx={{ mt: 2 }}
                  >
                    {metadata.map(
                      ([label, value]) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={label}
                        >
                          <DetailField
                            label={label}
                            value={value}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>

                </Grid>

              </Grid>

            </CardContent>
          </Card>

          {/* TABS SECTION */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}
          >

            <Tabs
              value={currentTab}
              onChange={(_, value) =>
                setCurrentTab(value)
              }
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 2,
                pt: 1
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                />
              ))}
            </Tabs>

            <Divider />

            <CardContent sx={{ p: 4 }}>

              {/* PRODUCT MASTER LOG */}
              {currentTab === 0 && (
                <Grid container spacing={4}>
                  {technicalFields.map(
                    ([label, value]) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={label}
                      >
                        <DetailField
                          label={label}
                          value={value}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              )}

              {/* OTHER TABS */}
              {currentTab === 1 && (
                <Typography>
                  Logistics Trail data coming
                  from backend...
                </Typography>
              )}

              {currentTab === 2 && (
                <Typography>
                  Maintenance History data
                  coming from backend...
                </Typography>
              )}

              {currentTab === 3 && (

  <Grid container spacing={2}>

    {product.attachments?.length > 0 ? (

      product.attachments.map(
        (file: any) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={file.id}
          >

            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                border:
                  '1px solid #e5e7eb'
              }}
            >

              <Typography
                variant="subtitle2"
              >
                {file.fileName}
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                size="small"
                href={`http://localhost:8080/${file.fileUrl}`}
                target="_blank"
              >
                View Document
              </Button>

            </Paper>

          </Grid>
        )
      )

    ) : (

      <Typography>
        No documents available
      </Typography>

    )}

  </Grid>
)}

              {currentTab === 4 && (
                <Typography>
                  Digital Twin integration
                  coming soon...
                </Typography>
              )}

              {currentTab === 5 && (
                <Typography>
                  Audit Trail coming from
                  backend...
                </Typography>
              )}

            </CardContent>

          </Card>

        </Stack>
      </Box>
    </>
  );
}

export default ProductDetailsPage;  