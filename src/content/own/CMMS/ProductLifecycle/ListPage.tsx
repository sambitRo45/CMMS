import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TitleContext } from 'src/contexts/TitleContext';
import { getProductStatusColor } from '../components';

const statusFilters = [
  'All',
  'In Service',
  'Manufacturing',
  'Maintenance',
  'Retired'
];

function ProductLifecycleListPage() {
  const navigate = useNavigate();
  const { setTitle } = useContext(TitleContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle('Product Lifecycle Log');
  }, [setTitle]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get('http://localhost:8080/api/products');

        // backend structure: ApiResponse { success, message, data }
        setProducts(res.data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const matchesStatus =
      statusFilter === 'All' || product.status === statusFilter;

    const matchesSearch =
      !normalizedSearch ||
      [
        product.productUid,
        product.productName,
        product.productCategory,
        product.productSerialNumber,
        product.lifecycleStage,
        product.qcStatus,
        product.productStatus
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const handleFutureAction = (event: React.MouseEvent, action: string) => {
    event.stopPropagation();
    console.info(`${action} will connect later`);
  };

  return (
    <>
      <Helmet>
        <title>Product Lifecycle Log</title>
      </Helmet>

      <Box p={{ xs: 2, md: 4 }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Breadcrumbs>
              <Link component={RouterLink} to="/app/home">
                Home
              </Link>
              <Typography>Product Lifecycle Log</Typography>
            </Breadcrumbs>

            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="h2">
                  Product Lifecycle Log
                </Typography>
                <Typography color="text.secondary">
                  View product records from backend
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  variant="outlined"
                  startIcon={<FilterListTwoToneIcon />}
                  onClick={(e) => setFilterAnchor(e.currentTarget)}
                >
                  Filter
                </Button>

                <Button
                  variant="contained"
                  startIcon={<AddTwoToneIcon />}
                  onClick={() =>
                    navigate('/app/product-lifecycle/new')
                  }
                >
                  Add Product
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Model No</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          Loading products...
                        </TableCell>
                      </TableRow>
                    ) : filteredProducts.length ? (
                      filteredProducts.map((product) => (
                        <TableRow
                          key={product.productUid}
                          hover
                          onClick={() =>
                            navigate(
                              `/app/product-lifecycle/${product.productUid}`
                            )
                          }
                        >
                          <TableCell>
                            {product.productUid}
                          </TableCell>

                          <TableCell>
                            <Typography variant="subtitle2">
                              {product.productName}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            {product.productCategory}
                          </TableCell>

                          <TableCell>
                            {product.modelNumber}
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={product.productStatus}
                              color={getProductStatusColor(
                                product.productStatus
                              )}
                            />
                          </TableCell>

                          <TableCell align="right">
                            <Tooltip title="View">
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/app/product-lifecycle/${product.productUid}`
                                  );
                                }}
                              >
                                <VisibilityTwoToneIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                              <IconButton
                                onClick={(e) =>
                                  handleFutureAction(e, 'Edit')
                                }
                              >
                                <EditTwoToneIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                              <IconButton
                                onClick={(e) =>
                                  handleFutureAction(e, 'Delete')
                                }
                                color="error"
                              >
                                <DeleteTwoToneIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6}>
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        {statusFilters.map((status) => (
          <MenuItem
            key={status}
            selected={statusFilter === status}
            onClick={() => {
              setStatusFilter(status);
              setFilterAnchor(null);
            }}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ProductLifecycleListPage;