import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Avatar,
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
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';

import { QRCodeSVG } from 'qrcode.react';

import {
  Link as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';

import axios from 'src/utils/axios';

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
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          mt: 0.5,
          fontWeight: 600
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

  const [imageSrc, setImageSrc] = useState('');

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );

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

  // FETCH IMAGE
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!product?.imageUrl) return;

        const response = await axios.get(
          `http://localhost:8080${product.imageUrl}`,
          {
            responseType: 'blob'
          }
        );

        const imageObjectUrl =
          URL.createObjectURL(response.data);

        setImageSrc(imageObjectUrl);
      } catch (error) {
        console.error(
          'IMAGE FETCH ERROR:',
          error
        );
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [product]);

  useEffect(() => {
    setTitle(
      product?.productName ||
        'Product Details'
    );
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
          <Typography>
            Loading product...
          </Typography>
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

  const productMasterFields = [
    ['Product UID', product.productUid],
    [
      'Product Serial Number',
      product.productSerialNumber
    ],
    ['Product Name', product.productName],
    ['Product Category', product.category],
    ['Product Version', product.productVersion],
    [
      'Manufacturing Batch ID',
      product.manufacturingBatchId
    ],
    ['BOM Version', product.bomVersion],
    ['Assembly Date', product.assemblyDate],
    ['QC Status', product.qcStatus],
    ['Firmware Version', product.firmwareVersion],
    ['MAC Address', product.macAddress],
    ['IMEI / Module ID', product.imeiModuleId],
    [
      'Assigned Customer',
      product.assignedCustomer
    ],
    [
      'Installation Site',
      product.installationSite
    ]
  ];

  const logisticsFields = [
    ['Shipment ID', product.shipmentId],
    ['Dispatch Date', product.dispatchDate],
    [
      'Dispatch Location',
      product.dispatchLocation
    ],
    ['Transit Hub', product.transitHub],
    ['GPS Trail', product.locationGps],
    ['Courier / Fleet', product.courier],
    ['Vehicle Number', product.vehicleNumber],
    ['Driver Details', product.driverDetails],
    ['Delivery Date', product.deliveryDate],
    ['Received By', product.receivedBy],
    [
      'Shipment Condition',
      product.shipmentCondition
    ],
    ['Delay Reason', product.delayReason]
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
          backgroundColor: '#f4f6fb',
          minHeight: '100vh'
        }}
      >
        <Stack spacing={3}>
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
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight={700}
              >
                Product Lifecycle Log
              </Typography>

              <Breadcrumbs
                separator="›"
                sx={{ mt: 1 }}
              >
                <Link
                  component={RouterLink}
                  to="/app/home"
                  underline="hover"
                  color="inherit"
                >
                  Modules
                </Link>

                <Link
                  component={RouterLink}
                  to="/app/product-lifecycle"
                  underline="hover"
                  color="inherit"
                >
                  Product lifecycle Log
                </Link>

                <Typography color="text.primary">
                  Product Details
                </Typography>
              </Breadcrumbs>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={
                  <OpenInNewTwoToneIcon />
                }
              >
                Export Report
              </Button>

              <Button
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(90deg,#0f5ef7,#003cc5)',
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Edit Product
              </Button>
            </Stack>
          </Stack>

          {/* TOP CARD */}
          <Card
            sx={{
              borderRadius: 3,
              border:
                '1px solid rgba(0,0,0,0.08)',
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* IMAGE + QR */}
                <Grid item xs={12} md={3}>
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* PRODUCT IMAGE */}
                    <Paper
                      elevation={0}
                      sx={{
                        width: 140,
                        height: 140,
                        border:
                          '1px solid #e5e7eb',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        component="img"
                        src={imageSrc}
                        alt={
                          product.productName
                        }
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Paper>

                    {/* QR */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        border:
                          '1px solid #e5e7eb',
                        borderRadius: 2
                      }}
                    >
                      <QRCodeSVG
                        value={
                          product.productUid
                        }
                        size={90}
                      />

                      {/* <Typography
                        variant="caption"
                        display="block"
                        textAlign="center"
                        mt={1}
                      >
                        Scan for details
                      </Typography> */}
                    </Paper>
                  </Stack>
                </Grid>

                {/* PRODUCT INFO */}
                <Grid item xs={12} md={9}>
                  <Grid
                    container
                    spacing={3}
                  >
                    {/* PRODUCT UID */}
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Product UID
                          </Typography>

                          <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{ mt: 0.5 }}
                          >
                            {
                              product.productUid
                            }
                          </Typography>
                        </Box>

                        {/* PRODUCT STATUS */}
                        <Chip
                          label={
                            product.productStatus ||
                            'Active'
                          }
                          sx={{
                            height: 32,
                            px: 1,
                            borderRadius: 2,
                            backgroundColor:
                              '#e8f5e9',
                            color: '#2e7d32',
                            fontWeight: 700,
                            fontSize: 13,
                            border:
                              '1px solid #c8e6c9'
                          }}
                        />
                      </Stack>
                    </Grid>

                    {/* DETAILS */}
                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Product Name"
                        value={
                          product.productName
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Product Category"
                        value={
                          product.category
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Serial Number"
                        value={
                          product.productSerialNumber
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Product Version"
                        value={
                          product.productVersion
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Manufacturing Batch ID"
                        value={
                          product.manufacturingBatchId
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DetailField
                        label="Assembly Date"
                        value={
                          product.assemblyDate
                        }
                      />
                    </Grid>

                    {/* QC STATUS */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            'text.secondary',
                          fontWeight: 700,
                          textTransform:
                            'uppercase'
                        }}
                      >
                        QC Status
                      </Typography>

                      <Box mt={1}>
                        <Chip
                          label={
                            product.qcStatus ||
                            'Pass'
                          }
                          sx={{
                            height: 32,
                            borderRadius: 2,
                            backgroundColor:
                              product.qcStatus ===
                              'Pass'
                                ? '#e8f5e9'
                                : '#fff3e0',
                            color:
                              product.qcStatus ===
                              'Pass'
                                ? '#2e7d32'
                                : '#ef6c00',
                            border:
                              product.qcStatus ===
                              'Pass'
                                ? '1px solid #c8e6c9'
                                : '1px solid #ffcc80',
                            fontWeight: 700,
                            px: 1
                          }}
                        />
                      </Box>
                    </Grid>

                    {/* PRODUCT STATUS */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            'text.secondary',
                          fontWeight: 700,
                          textTransform:
                            'uppercase'
                        }}
                      >
                        Product Status
                      </Typography>

                      <Box mt={1}>
                        <Chip
                          label={
                            product.productStatus ||
                            'Active'
                          }
                          sx={{
                            height: 32,
                            borderRadius: 2,
                            backgroundColor:
                              '#e3f2fd',
                            color: '#1565c0',
                            border:
                              '1px solid #90caf9',
                            fontWeight: 700,
                            px: 1
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* TABS */}
          <Card
            sx={{
              borderRadius: 3,
              border:
                '1px solid rgba(0,0,0,0.08)',
              boxShadow: 'none'
            }}
          >
            <Tabs
              value={currentTab}
              onChange={(_, value) =>
                setCurrentTab(value)
              }
              variant="scrollable"
              scrollButtons="auto"
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

            <CardContent sx={{ p: 3 }}>
              {/* PRODUCT MASTER LOG */}
              {currentTab === 0 && (
                <Grid container spacing={3}>
                  {/* LEFT */}
                  <Grid item xs={12} lg={8}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        border:
                          '1px solid #e5e7eb',
                        boxShadow: 'none'
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderBottom:
                            '1px solid #e5e7eb'
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Inventory2TwoToneIcon color="primary" />

                          <Typography
                            variant="h5"
                            fontWeight={700}
                          >
                            Product Master Log
                          </Typography>
                        </Stack>
                      </Box>

                      <Grid
                        container
                        spacing={0}
                      >
                        {productMasterFields.map(
                          (
                            [label, value],
                            index
                          ) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              key={index}
                              sx={{
                                borderRight:
                                  index %
                                    2 ===
                                  0
                                    ? '1px solid #e5e7eb'
                                    : 'none',
                                borderBottom:
                                  '1px solid #e5e7eb',
                                p: 2
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                fontWeight={700}
                              >
                                {label}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.5}
                              >
                                {value ||
                                  '-'}
                              </Typography>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Card>
                  </Grid>

                  {/* RIGHT */}
                  <Grid item xs={12} lg={4}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        border:
                          '1px solid #e5e7eb',
                        boxShadow: 'none'
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderBottom:
                            '1px solid #e5e7eb'
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <LocalShippingTwoToneIcon color="primary" />

                          <Typography
                            variant="h5"
                            fontWeight={700}
                          >
                            Logistics Trail
                          </Typography>
                        </Stack>
                      </Box>

                      <Stack spacing={0}>
                        {logisticsFields.map(
                          (
                            [label, value],
                            index
                          ) => (
                            <Box
                              key={index}
                              sx={{
                                p: 2,
                                borderBottom:
                                  '1px solid #e5e7eb'
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                fontWeight={700}
                              >
                                {label}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.5}
                              >
                                {value ||
                                  '-'}
                              </Typography>
                            </Box>
                          )
                        )}
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* DOCUMENTS */}
              {currentTab === 3 && (
                <Grid container spacing={2}>
                  {product.attachments
                    ?.length > 0 ? (
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
                              p: 3,
                              borderRadius: 2,
                              border:
                                '1px solid #e5e7eb'
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                            >
                              {file.fileName}
                            </Typography>

                            <Button
                              sx={{ mt: 2 }}
                              variant="outlined"
                              size="small"
                              href={`http://localhost:8080${file.fileUrl}`}
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

              {/* OTHER TABS */}
              {currentTab !== 0 &&
                currentTab !== 3 && (
                  <Typography>
                    Data coming from backend...
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