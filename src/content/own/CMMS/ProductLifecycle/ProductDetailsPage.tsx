import { useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { QRCodeSVG } from 'qrcode.react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';
import { getProductStatusColor } from '../components';
import { mockProducts } from '../mockData';
import type { ProductDocument, ProductEvent, ProductMetric } from '../types';

const tabs = [
  'Product Master Log',
  'Logistics Trail',
  'Maintenance History',
  'Documents',
  'Digital Twin',
  'Audit Trail'
];

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="subtitle2">{value || '-'}</Typography>
    </Box>
  );
}

function EventList({ events }: { events: ProductEvent[] }) {
  if (!events.length) {
    return (
      <Typography color="text.secondary">
        No records are available for this tab.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {events.map((event) => (
        <Paper key={event.id} variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={1}
          >
            <Box>
              <Typography variant="subtitle2">{event.label}</Typography>
              <Typography color="text.secondary" variant="body2">
                {event.description}
              </Typography>
            </Box>
            <Box textAlign={{ xs: 'left', md: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                {event.timestamp}
              </Typography>
              <Typography variant="body2">{event.owner}</Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

function DocumentsTable({ documents }: { documents: ProductDocument[] }) {
  if (!documents.length) {
    return (
      <Typography color="text.secondary">
        No documents are attached to this product.
      </Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Document</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell>{document.name}</TableCell>
            <TableCell>{document.category}</TableCell>
            <TableCell>{document.owner}</TableCell>
            <TableCell>{document.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DigitalTwinMetrics({ metrics }: { metrics: ProductMetric[] }) {
  return (
    <Grid container spacing={2}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.label}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {metric.label}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Typography variant="h3">{metric.value}</Typography>
              <Chip size="small" color={metric.status} label={metric.status} />
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function ProductDetailsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { setTitle } = useContext(TitleContext);
  const [currentTab, setCurrentTab] = useState(0);

  const product = useMemo(() => {
    // TODO: Fetch product details from backend by ID.
    return mockProducts.find((item) => item.id === productId);
  }, [productId]);

  useEffect(() => {
    setTitle(product ? product.name : 'Product Details');
  }, [product, setTitle]);

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found</title>
        </Helmet>
        <Box p={{ xs: 2, md: 4 }}>
          <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <CardContent sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h2">Product not found</Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                The requested product ID does not exist in the mock data.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ArrowBackTwoToneIcon />}
                onClick={() => navigate('/app/product-lifecycle')}
              >
                Back to Product List
              </Button>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  }

  const metadata = [
    ['Product UID', product.productUid],
    ['Serial Number', product.serialNumber],
    ['Version', product.productVersion],
    ['BOM Version', product.bomVersion],
    ['Batch ID', product.manufacturingBatchId],
    ['QC Status', product.qcStatus],
    ['Lifecycle Stage', product.lifecycleStage],
    ['Customer', product.assignedCustomer],
    ['Installation Site', product.installationSite],
    ['Location', product.locationGps],
    ['Contact', product.contactPerson],
    ['Email', product.email]
  ];

  const technicalFields = [
    ['Model Number', product.modelNumber],
    ['Part Number', product.partNumber],
    ['MAC Address', product.macAddress],
    ['IMEI / Module ID', product.imeiModuleId],
    ['Hardware Version', product.hardwareVersion],
    ['Firmware Version', product.firmwareVersion],
    ['RFID Tag ID', product.rfidTagId],
    ['Manufacturing Date', product.manufacturingDate],
    ['Assembly Date', product.assemblyDate]
  ];

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Breadcrumbs aria-label="breadcrumb">
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
              <Typography color="text.primary">{product.id}</Typography>
            </Breadcrumbs>
            <Button
              startIcon={<ArrowBackTwoToneIcon />}
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => navigate('/app/product-lifecycle')}
            >
              Back to Product List
            </Button>
          </Stack>

          <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack spacing={2}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                      }}
                    >
                      <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'contain'
                        }}
                      />
                    </Paper>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <QRCodeSVG value={product.qrValue} size={132} />
                    </Paper>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={9}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h2">{product.name}</Typography>
                        <Chip
                          size="small"
                          label={product.status}
                          color={getProductStatusColor(product.status)}
                        />
                      </Stack>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {product.description}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      endIcon={<OpenInNewTwoToneIcon />}
                      href={product.digitalTwinLink}
                      target="_blank"
                    >
                      Digital Twin
                    </Button>
                  </Stack>

                  <Grid container spacing={2}>
                    {metadata.map(([label, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={label}>
                        <DetailField label={label} value={value} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <Tabs
              value={currentTab}
              onChange={(_event, value) => setCurrentTab(value)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs.map((tab) => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>
            <Divider />
            <CardContent>
              {currentTab === 0 && (
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    {technicalFields.map(([label, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={label}>
                        <DetailField label={label} value={value} />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider />
                  <EventList events={product.masterLog} />
                </Stack>
              )}
              {currentTab === 1 && (
                <EventList events={product.logisticsTrail} />
              )}
              {currentTab === 2 && (
                <EventList events={product.maintenanceHistory} />
              )}
              {currentTab === 3 && (
                <Stack spacing={2}>
                  <DocumentsTable documents={product.documents} />
                  <Divider />
                  <Grid container spacing={2}>
                    {product.attachments.map((attachment) => (
                      <Grid item xs={12} sm={6} md={4} key={attachment.name}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                          <Typography variant="subtitle2">
                            {attachment.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {attachment.type} - {attachment.size}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Updated {attachment.updatedAt}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              )}
              {currentTab === 4 && (
                <Stack spacing={2}>
                  <DigitalTwinMetrics metrics={product.digitalTwinMetrics} />
                  <Typography color="text.secondary">
                    {product.digitalTwinLink}
                  </Typography>
                </Stack>
              )}
              {currentTab === 5 && <EventList events={product.auditTrail} />}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </>
  );
}

export default ProductDetailsPage;
