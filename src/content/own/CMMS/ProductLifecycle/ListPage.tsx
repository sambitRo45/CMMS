import { useContext, useEffect, useMemo, useState } from 'react';
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

import { TitleContext } from 'src/contexts/TitleContext';
import { getProductStatusColor } from '../components';
import { mockProducts } from '../mockData';

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

  useEffect(() => {
    setTitle('Product Lifecycle Log');
  }, [setTitle]);

  const products = useMemo(() => {
    // TODO: Replace mock product list with backend API call.
    return mockProducts;
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesStatus =
        statusFilter === 'All' || product.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        [
          product.id,
          product.name,
          product.category,
          product.subcategory,
          product.description,
          product.status
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [products, searchQuery, statusFilter]);

  const handleFutureAction = (event: React.MouseEvent, action: string) => {
    event.stopPropagation();
    // TODO: Update / delete product using backend API.
    console.info(`${action} product action will connect to backend later`);
  };

  return (
    <>
      <Helmet>
        <title>Product Lifecycle Log</title>
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
              <Typography color="text.primary">
                Product Lifecycle Log
              </Typography>
            </Breadcrumbs>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', md: 'center' }}
              spacing={2}
            >
              <Box>
                <Typography variant="h2">Product Lifecycle Log</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  View product records, current lifecycle stage, and status.
                </Typography>
              </Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <TextField
                  size="small"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  sx={{ minWidth: { xs: '100%', sm: 260 } }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListTwoToneIcon />}
                  onClick={(event) => setFilterAnchor(event.currentTarget)}
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

          <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Subcategory</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow
                        hover
                        key={product.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={() =>
                          navigate(
                            `/app/product-lifecycle/${product.id}`
                          )
                        }
                      >
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.serialNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.subcategory}</TableCell>
                        <TableCell sx={{ maxWidth: 320 }}>
                          <Typography variant="body2" noWrap>
                            {product.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            variant="outlined"
                            label={product.status}
                            color={getProductStatusColor(product.status)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View details">
                            <IconButton
                              size="small"
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(
                                  `/app/product-lifecycle/${product.id}`
                                );
                              }}
                            >
                              <VisibilityTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit later">
                            <IconButton
                              size="small"
                              onClick={(event) =>
                                handleFutureAction(event, 'Edit')
                              }
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete later">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(event) =>
                                handleFutureAction(event, 'Delete')
                              }
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!filteredProducts.length && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <Box sx={{ py: 8, textAlign: 'center' }}>
                            <Typography variant="h4">
                              No products found
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                              Adjust your search or filter and try again.
                            </Typography>
                          </Box>
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
