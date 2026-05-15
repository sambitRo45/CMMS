import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { QRCodeSVG } from 'qrcode.react';
import { useDropzone } from 'react-dropzone';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { CustomSnackBarContext } from 'src/contexts/CustomSnackBarContext';
import { TitleContext } from 'src/contexts/TitleContext';
import { lifecycleStages } from '../mockData';

type ProductFormValues = {
  productUid: string;
  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productVersion: string;
  bomVersion: string;
  manufacturingBatchId: string;
  manufacturingDate: string;
  assemblyDate: string;
  qcStatus: string;
  productStatus: string;
  lifecycleStage: string;
  modelNumber: string;
  partNumber: string;
  macAddress: string;
  imeiModuleId: string;
  hardwareVersion: string;
  firmwareVersion: string;
  rfidTagId: string;
  digitalTwinLink: string;
  remarks: string;
  assignedCustomer: string;
  installationSite: string;
  locationGps: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
};

const initialProductForm: ProductFormValues = {
  productUid: 'PRD-NEW-0001',
  productName: '',
  productCategory: '',
  productSerialNumber: '',
  productVersion: '',
  bomVersion: '',
  manufacturingBatchId: '',
  manufacturingDate: '',
  assemblyDate: '',
  qcStatus: 'Pending',
  productStatus: 'Manufacturing',
  lifecycleStage: 'Design',
  modelNumber: '',
  partNumber: '',
  macAddress: '',
  imeiModuleId: '',
  hardwareVersion: '',
  firmwareVersion: '',
  rfidTagId: '',
  digitalTwinLink: '',
  remarks: '',
  assignedCustomer: '',
  installationSite: '',
  locationGps: '',
  contactPerson: '',
  contactNumber: '',
  email: ''
};

const categoryOptions = ['Electronics', 'Machinery', 'Power', 'Gateway'];
const qcOptions = ['Pending', 'In Progress', 'Passed', 'Failed'];
const statusOptions = ['Manufacturing', 'In Service', 'Maintenance', 'Retired'];

function NewProductPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setTitle } = useContext(TitleContext);
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const [formValues, setFormValues] =
    useState<ProductFormValues>(initialProductForm);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    setTitle('Add Product');
  }, [setTitle]);

  const handleAttachmentsDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Upload attachments using backend API.
    setAttachmentFiles((current) => [...current, ...acceptedFiles]);
  }, []);

  const handleImageDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Upload product image using backend API.
    setImageFiles(acceptedFiles.slice(0, 1));
  }, []);

  const attachmentDropzone = useDropzone({
    onDrop: handleAttachmentsDrop,
    multiple: true
  });

  const imageDropzone = useDropzone({
    onDrop: handleImageDrop,
    multiple: false
  });

  const handleFieldChange =
    (field: keyof ProductFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const handleLifecycleChange = (_event: React.MouseEvent, value: string) => {
    if (!value) return;
    setFormValues((current) => ({
      ...current,
      lifecycleStage: value,
      productStatus:
        value === 'In Service' || value === 'Maintenance' || value === 'Retired'
          ? value
          : current.productStatus
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect Save Product button to backend endpoint.
    showSnackBar('Product saved in the frontend mock flow', 'success');
    navigate('/app/product-lifecycle');
  };

  const handleDraft = () => {
    // TODO: Connect Save as Draft button to backend endpoint.
    showSnackBar('Draft saved in local mock state', 'success');
  };

  const handleClear = () => {
    setFormValues(initialProductForm);
    setAttachmentFiles([]);
    setImageFiles([]);
  };

  const renderField = (
    field: keyof ProductFormValues,
    label: string,
    options?: string[],
    props: { type?: string; multiline?: boolean; rows?: number } = {}
  ) => (
    <TextField
      fullWidth
      size="small"
      label={label}
      select={Boolean(options)}
      value={formValues[field]}
      onChange={handleFieldChange(field)}
      type={props.type}
      multiline={props.multiline}
      rows={props.rows}
      InputLabelProps={props.type === 'date' ? { shrink: true } : undefined}
    >
      {options?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        p={{ xs: 2, md: 4 }}
      >
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
              <Typography color="text.primary">Add Product</Typography>
            </Breadcrumbs>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', md: 'center' }}
              spacing={2}
            >
              <Box>
                <Typography variant="h2">Add Product</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Create a product lifecycle master record.
                </Typography>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button onClick={() => navigate('/app/product-lifecycle')}>
                  Cancel
                </Button>
                <Button onClick={handleDraft} variant="outlined">
                  Save as Draft
                </Button>
                <Button type="submit" variant="contained" startIcon={<SaveTwoToneIcon />}>
                  Save Product
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {renderSection(
            'Basic Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField('productUid', 'Product UID')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('productName', 'Product Name')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('productCategory', 'Product Category', categoryOptions)}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('productSerialNumber', 'Product Serial Number')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('productVersion', 'Product Version')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('bomVersion', 'BOM Version')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('manufacturingBatchId', 'Manufacturing Batch ID')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('manufacturingDate', 'Manufacturing Date', undefined, {
                  type: 'date'
                })}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('assemblyDate', 'Assembly Date', undefined, {
                  type: 'date'
                })}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('qcStatus', 'QC Status', qcOptions)}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('productStatus', 'Product Status', statusOptions)}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('lifecycleStage', 'Lifecycle Stage', [...lifecycleStages])}
              </Grid>
            </>
          )}

          {renderSection(
            'Technical Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField('modelNumber', 'Model Number')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('partNumber', 'Part Number')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('macAddress', 'MAC Address')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('imeiModuleId', 'IMEI / Module ID')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('hardwareVersion', 'Hardware Version')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('firmwareVersion', 'Firmware Version')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('rfidTagId', 'RFID Tag ID')}
              </Grid>
              <Grid item xs={12} md={8}>
                {renderField('digitalTwinLink', 'Digital Twin Link')}
              </Grid>
              <Grid item xs={12}>
                {renderField('remarks', 'Description / Remarks', undefined, {
                  multiline: true,
                  rows: 3
                })}
              </Grid>
            </>
          )}

          {renderSection(
            'Customer & Location Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField('assignedCustomer', 'Assigned Customer')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('installationSite', 'Installation Site')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('locationGps', 'Location (GPS)')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('contactPerson', 'Contact Person')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('contactNumber', 'Contact Number')}
              </Grid>
              <Grid item xs={12} md={4}>
                {renderField('email', 'Email')}
              </Grid>
            </>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Card sx={{ height: '100%', borderRadius: 1, boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    Attachments
                  </Typography>
                  <Paper
                    variant="outlined"
                    {...attachmentDropzone.getRootProps()}
                    sx={{
                      p: 3,
                      minHeight: 150,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: attachmentDropzone.isDragActive
                        ? alpha(theme.palette.primary.main, 0.08)
                        : 'background.default',
                      borderStyle: 'dashed'
                    }}
                  >
                    <input {...attachmentDropzone.getInputProps()} />
                    <Stack spacing={1} alignItems="center">
                      <AttachFileTwoToneIcon color="primary" />
                      <Typography variant="subtitle2">
                        Drop files here or click to upload
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {attachmentFiles.length
                          ? attachmentFiles.map((file) => file.name).join(', ')
                          : 'PDF, image, spreadsheet, and document files'}
                      </Typography>
                    </Stack>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Card sx={{ height: '100%', borderRadius: 1, boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    Product Image / QR Code
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                      <Paper
                        variant="outlined"
                        {...imageDropzone.getRootProps()}
                        sx={{
                          p: 3,
                          height: '100%',
                          minHeight: 150,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          cursor: 'pointer',
                          bgcolor: imageDropzone.isDragActive
                            ? alpha(theme.palette.primary.main, 0.08)
                            : 'background.default',
                          borderStyle: 'dashed'
                        }}
                      >
                        <input {...imageDropzone.getInputProps()} />
                        <Stack spacing={1} alignItems="center">
                          <UploadFileTwoToneIcon color="primary" />
                          <Typography variant="subtitle2">
                            Upload product image
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {imageFiles[0]?.name || 'One image for this product'}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          height: '100%',
                          minHeight: 150,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <QRCodeSVG
                          value={formValues.productUid || 'NEW-PRODUCT'}
                          size={112}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Lifecycle Stages
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={formValues.lifecycleStage}
                onChange={handleLifecycleChange}
                sx={{
                  flexWrap: 'wrap',
                  gap: 1,
                  '& .MuiToggleButtonGroup-grouped': {
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1
                  }
                }}
              >
                {lifecycleStages.map((stage) => (
                  <ToggleButton key={stage} value={stage}>
                    {stage}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          <Divider />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="flex-end"
            spacing={1.5}
          >
            <Button
              type="button"
              startIcon={<ClearTwoToneIcon />}
              onClick={handleClear}
            >
              Clear Form
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/app/product-lifecycle')}
            >
              Cancel
            </Button>
            <Button type="button" variant="outlined" onClick={handleDraft}>
              Save as Draft
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveTwoToneIcon />}>
              Save Product
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default NewProductPage;
