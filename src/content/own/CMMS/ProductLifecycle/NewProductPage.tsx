// File Name: src/content/productLifecycle/NewProductPage/index.tsx

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  alpha,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
  useTheme
} from '@mui/material';

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

import { QRCodeSVG } from 'qrcode.react';

import { useDropzone } from 'react-dropzone';

import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';

import axios from 'src/utils/axios';

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

const generateProductUid = (): string => {
  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  const today = new Date();

  return `PRD-${today.getFullYear()}${String(
    today.getMonth() + 1
  ).padStart(2, '0')}${String(
    today.getDate()
  ).padStart(2, '0')}-${random}`;
};

const createInitialFormValues =
  (): ProductFormValues => ({
    productUid: generateProductUid(),
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
  });

const categoryOptions = [
  'Electronics',
  'Machinery',
  'Power',
  'Gateway'
];

const qcOptions = [
  'Pending',
  'In Progress',
  'Passed',
  'Failed'
];

const statusOptions = [
  'Manufacturing',
  'In Service',
  'Maintenance',
  'Retired',
  'Draft'
];

function NewProductPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { setTitle } =
    useContext(TitleContext);

  const { showSnackBar } = useContext(
    CustomSnackBarContext
  );

  const [formValues, setFormValues] =
    useState<ProductFormValues>(
      createInitialFormValues()
    );

  const [attachmentFiles, setAttachmentFiles] =
    useState<File[]>([]);

  const [imageFiles, setImageFiles] =
    useState<File[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    setTitle('Add Product');
  }, [setTitle]);

  /**
   * Attachment Upload
   */
  const handleAttachmentsDrop =
    useCallback((acceptedFiles: File[]) => {
      setAttachmentFiles((prev) => [
        ...prev,
        ...acceptedFiles
      ]);
    }, []);

  /**
   * Image Upload
   */
  const handleImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImageFiles(
        acceptedFiles.slice(0, 1)
      );
    },
    []
  );

  const attachmentDropzone = useDropzone({
    onDrop: handleAttachmentsDrop,
    multiple: true
  });

  const imageDropzone = useDropzone({
    onDrop: handleImageDrop,
    multiple: false
  });

  /**
   * Handle Field Change
   */
  const handleFieldChange =
    (field: keyof ProductFormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value
      }));
    };

  /**
   * Lifecycle Change
   */
  const handleLifecycleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (!value) return;

    setFormValues((prev) => ({
      ...prev,
      lifecycleStage: value
    }));
  };

  /**
   * Build Multipart FormData
   *
   * IMPORTANT:
   * Backend Controller expects:
   *
   * @RequestPart("product") String productJson
   *
   * So frontend MUST send plain string.
   */
  const buildFormData = (
  payload: ProductFormValues
) => {
  const formData = new FormData();

  formData.append(
    'product',
    JSON.stringify(payload)
  );

  if (imageFiles.length > 0) {
    formData.append(
      'image',
      imageFiles[0]
    );
  }

  attachmentFiles.forEach((file) => {
    formData.append(
      'attachments',
      file
    );
  });

  return formData;
};

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append('product', JSON.stringify(formValues));

    if (imageFiles.length > 0) {
      formData.append('image', imageFiles[0]);
    }

    attachmentFiles.forEach((file) => {
      formData.append('attachments', file);
    });

    const response = await axios.post('/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('SUCCESS RESPONSE:', response.data);

    showSnackBar(
      response.data?.message || 'Product saved successfully',
      'success'
    );

    navigate('/app/product-lifecycle');
  } catch (error: any) {
    console.error('FULL ERROR:', error);
    console.error('ERROR RESPONSE:', error?.response);

    showSnackBar(
      error?.response?.data?.message || 'Something went wrong',
      'error'
    );
  } finally {
    setLoading(false);
  }
};

  /**
   * Save Draft
   */
  const handleDraft = async () => {
  try {
    setLoading(true);

    const draftValues = {
      ...formValues,
      productStatus: 'Draft'
    };

    const formData = new FormData();

    formData.append('product', JSON.stringify(draftValues));

    if (imageFiles.length > 0) {
      formData.append('image', imageFiles[0]);
    }

    attachmentFiles.forEach((file) => {
      formData.append('attachments', file);
    });

    const response = await axios.post('/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    showSnackBar(
      response.data?.message || 'Draft saved successfully',
      'success'
    );
  } catch (error: any) {
    console.error(error);

    showSnackBar(
      error?.response?.data?.message || 'Failed to save draft',
      'error'
    );
  } finally {
    setLoading(false);
  }
};
  /**
   * Clear Form
   */
  const handleClear = () => {
    setFormValues(
      createInitialFormValues()
    );

    setAttachmentFiles([]);

    setImageFiles([]);

    showSnackBar(
      'Form cleared successfully',
      'success'
    );
  };

  /**
   * Render Field
   */
  const renderField = (
    field: keyof ProductFormValues,
    label: string,
    options?: string[],
    props: {
      type?: string;
      multiline?: boolean;
      rows?: number;
      disabled?: boolean;
    } = {}
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
      disabled={props.disabled}
      InputLabelProps={
        props.type === 'date'
          ? { shrink: true }
          : undefined
      }
    >
      {options?.map((option) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  /**
   * Render Section
   */
  const renderSection = (
    title: string,
    children: ReactNode
  ) => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow:
          '0px 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          sx={{ mb: 3 }}
        >
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
        <Stack spacing={3}>
          {/* HEADER */}
          <Stack spacing={1}>
            <Breadcrumbs>
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
                Product Lifecycle
              </Link>

              <Typography color="text.primary">
                Add Product
              </Typography>
            </Breadcrumbs>

            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              justifyContent="space-between"
              alignItems={{
                xs: 'stretch',
                md: 'center'
              }}
              spacing={2}
            >
              <Box>
                <Typography variant="h2">
                  Add Product
                </Typography>

                <Typography color="text.secondary">
                  Create product lifecycle
                  master record.
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={2}
              >
                <Button
                  onClick={() =>
                    navigate(
                      '/app/product-lifecycle'
                    )
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleDraft}
                  disabled={loading}
                >
                  Save Draft
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress
                        size={18}
                        color="inherit"
                      />
                    ) : (
                      <SaveTwoToneIcon />
                    )
                  }
                  disabled={loading}
                >
                  {loading
                    ? 'Saving...'
                    : 'Save Product'}
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* BASIC INFORMATION */}
          {renderSection(
            'Basic Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField(
                  'productUid',
                  'Product UID',
                  undefined,
                  {
                    disabled: true
                  }
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'productName',
                  'Product Name'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'productCategory',
                  'Product Category',
                  categoryOptions
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'productSerialNumber',
                  'Serial Number'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'productVersion',
                  'Product Version'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'bomVersion',
                  'BOM Version'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'manufacturingBatchId',
                  'Batch ID'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'manufacturingDate',
                  'Manufacturing Date',
                  undefined,
                  {
                    type: 'date'
                  }
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'assemblyDate',
                  'Assembly Date',
                  undefined,
                  {
                    type: 'date'
                  }
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'qcStatus',
                  'QC Status',
                  qcOptions
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'productStatus',
                  'Product Status',
                  statusOptions
                )}
              </Grid>
            </>
          )}

          {/* TECHNICAL INFO */}
          {renderSection(
            'Technical Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField(
                  'modelNumber',
                  'Model Number'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'partNumber',
                  'Part Number'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'macAddress',
                  'MAC Address'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'imeiModuleId',
                  'IMEI / Module ID'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'hardwareVersion',
                  'Hardware Version'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'firmwareVersion',
                  'Firmware Version'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'rfidTagId',
                  'RFID Tag ID'
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                {renderField(
                  'digitalTwinLink',
                  'Digital Twin Link'
                )}
              </Grid>

              <Grid item xs={12}>
                {renderField(
                  'remarks',
                  'Remarks',
                  undefined,
                  {
                    multiline: true,
                    rows: 4
                  }
                )}
              </Grid>
            </>
          )}

          {/* CUSTOMER INFO */}
          {renderSection(
            'Customer Information',
            <>
              <Grid item xs={12} md={4}>
                {renderField(
                  'assignedCustomer',
                  'Assigned Customer'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'installationSite',
                  'Installation Site'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'locationGps',
                  'Location GPS'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'contactPerson',
                  'Contact Person'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'contactNumber',
                  'Contact Number'
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderField(
                  'email',
                  'Email'
                )}
              </Grid>
            </>
          )}

          {/* FILE UPLOAD */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{ mb: 2 }}
                  >
                    Attachments
                  </Typography>

                  <Paper
                    variant="outlined"
                    {...attachmentDropzone.getRootProps()}
                    sx={{
                      p: 4,
                      borderStyle: 'dashed',
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor:
                        attachmentDropzone.isDragActive
                          ? alpha(
                              theme.palette.primary
                                .main,
                              0.08
                            )
                          : 'background.default'
                    }}
                  >
                    <input
                      {...attachmentDropzone.getInputProps()}
                    />

                    <AttachFileTwoToneIcon color="primary" />

                    <Typography>
                      Upload Attachments
                    </Typography>

                    <Typography variant="caption">
                      PDF, DOCX, XLSX,
                      Images
                    </Typography>

                    <Box mt={2}>
                      {attachmentFiles.map(
                        (file) => (
                          <Typography
                            key={file.name}
                            variant="body2"
                          >
                            • {file.name}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{ mb: 2 }}
                  >
                    Product Image
                  </Typography>

                  <Paper
                    variant="outlined"
                    {...imageDropzone.getRootProps()}
                    sx={{
                      p: 4,
                      borderStyle: 'dashed',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      {...imageDropzone.getInputProps()}
                    />

                    <UploadFileTwoToneIcon color="primary" />

                    <Typography>
                      Upload Product Image
                    </Typography>

                    <Typography variant="caption">
                      {imageFiles[0]?.name ||
                        'Single image'}
                    </Typography>
                  </Paper>

                  <Box
                    mt={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <QRCodeSVG
                      value={
                        formValues.productUid
                      }
                      size={120}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* LIFECYCLE */}
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ mb: 2 }}
              >
                Lifecycle Stage
              </Typography>

              <ToggleButtonGroup
                exclusive
                value={
                  formValues.lifecycleStage
                }
                onChange={
                  handleLifecycleChange
                }
                sx={{
                  flexWrap: 'wrap',
                  gap: 1
                }}
              >
                {lifecycleStages.map(
                  (stage) => (
                    <ToggleButton
                      key={stage}
                      value={stage}
                    >
                      {stage}
                    </ToggleButton>
                  )
                )}
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          <Divider />

          {/* FOOTER */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              startIcon={
                <ClearTwoToneIcon />
              }
              onClick={handleClear}
            >
              Clear
            </Button>

            <Button
              variant="outlined"
              onClick={handleDraft}
            >
              Save Draft
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress
                    size={18}
                    color="inherit"
                  />
                ) : (
                  <SaveTwoToneIcon />
                )
              }
            >
              {loading
                ? 'Saving...'
                : 'Save Product'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default NewProductPage;