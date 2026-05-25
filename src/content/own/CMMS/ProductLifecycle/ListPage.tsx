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
  Typography,
  CircularProgress
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';

import axios from 'src/utils/axios';

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

  const { setTitle } =
    useContext(TitleContext);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('All');

  const [filterAnchor, setFilterAnchor] =
    useState<null | HTMLElement>(null);

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // SET PAGE TITLE
  useEffect(() => {

    setTitle('Product Lifecycle Log');

  }, [setTitle]);

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          'http://localhost:8080/api/products'
        );

      console.log(
        'PRODUCT LIST:',
        response.data
      );

      setProducts(
        response.data.data || []
      );

    } catch (error) {

      console.error(
        'Error fetching products:',
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (
    e: React.MouseEvent,
    productUid: string
  ) => {

    e.stopPropagation();

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this product?'
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/products/${productUid}`
      );

      // REMOVE FROM UI
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product.productUid !== productUid
        )
      );

      alert(
        'Product deleted successfully'
      );

    } catch (error) {

      console.error(
        'Delete failed:',
        error
      );

      alert(
        'Failed to delete product'
      );
    }
  };

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((product) => {

      const normalizedSearch =
        searchQuery
          .trim()
          .toLowerCase();

      const matchesStatus =
        statusFilter === 'All' ||
        product.productStatus ===
          statusFilter;

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

      return (
        matchesStatus &&
        matchesSearch
      );
    });

  return (
    <>
      <Helmet>
        <title>
          Product Lifecycle Log
        </title>
      </Helmet>

      <Box p={{ xs: 2, md: 4 }}>

        <Stack spacing={2.5}>

          {/* HEADER */}
          <Stack spacing={1}>

            <Breadcrumbs>

              <Link
                component={RouterLink}
                to="/app/home"
              >
                Home
              </Link>

              <Typography>
                Product Lifecycle Log
              </Typography>

            </Breadcrumbs>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              <Box>

                <Typography variant="h2">
                  Product Lifecycle Log
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  View and manage all
                  product lifecycle records
                </Typography>

              </Box>

              <Stack
                direction="row"
                spacing={1}
              >

                {/* SEARCH */}
                <TextField
                  size="small"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon
                          fontSize="small"
                        />
                      </InputAdornment>
                    )
                  }}
                />

                {/* FILTER */}
                <Button
                  variant="outlined"
                  startIcon={
                    <FilterListTwoToneIcon />
                  }
                  onClick={(e) =>
                    setFilterAnchor(
                      e.currentTarget
                    )
                  }
                >
                  Filter
                </Button>

                {/* ADD */}
                <Button
                  variant="contained"
                  startIcon={
                    <AddTwoToneIcon />
                  }
                  onClick={() =>
                    navigate(
                      '/app/product-lifecycle/new'
                    )
                  }
                >
                  Add Product
                </Button>

              </Stack>

            </Stack>

          </Stack>

          {/* TABLE */}
          <Card>

            <CardContent sx={{ p: 0 }}>

              <TableContainer>

                <Table>

                  <TableHead>

                    <TableRow>

                      <TableCell>
                        Product UID
                      </TableCell>

                      <TableCell>
                        Product Name
                      </TableCell>

                      <TableCell>
                        Category
                      </TableCell>

                      <TableCell>
                        Model Number
                      </TableCell>

                      <TableCell>
                        Lifecycle Stage
                      </TableCell>

                      <TableCell>
                        Status
                      </TableCell>

                      <TableCell align="right">
                        Actions
                      </TableCell>

                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {/* LOADING */}
                    {loading ? (

                      <TableRow>

                        <TableCell
                          colSpan={7}
                          align="center"
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            py={3}
                          >

                            <CircularProgress
                              size={24}
                            />

                            <Typography>
                              Loading products...
                            </Typography>

                          </Stack>

                        </TableCell>

                      </TableRow>

                    ) : filteredProducts.length >
                      0 ? (

                      filteredProducts.map(
                        (product) => (

                          <TableRow
                            hover
                            key={
                              product.productUid
                            }
                            sx={{
                              cursor:
                                'pointer'
                            }}
                            onClick={() =>
                              navigate(
                                `/app/product-lifecycle/${product.productUid}`
                              )
                            }
                          >

                            <TableCell>
                              {
                                product.productUid
                              }
                            </TableCell>

                            <TableCell>

                              <Typography
                                variant="subtitle2"
                              >
                                {
                                  product.productName
                                }
                              </Typography>

                            </TableCell>

                            <TableCell>
                              {
                                product.productCategory
                              }
                            </TableCell>

                            <TableCell>
                              {
                                product.modelNumber
                              }
                            </TableCell>

                            <TableCell>
                              {
                                product.lifecycleStage
                              }
                            </TableCell>

                            <TableCell>

                              <Chip
                                size="small"
                                label={
                                  product.productStatus
                                }
                                color={getProductStatusColor(
                                  product.productStatus
                                )}
                              />

                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell align="right">

                              {/* VIEW */}
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

                              {/* EDIT */}
                              <Tooltip title="Edit">

                                <IconButton
                                  onClick={(e) => {

                                    e.stopPropagation();

                                    navigate(
                                      `/app/product-lifecycle/edit/${product.productUid}`
                                    );
                                  }}
                                >

                                  <EditTwoToneIcon />

                                </IconButton>

                              </Tooltip>

                              {/* DELETE */}
                              <Tooltip title="Delete">

                                <IconButton
                                  color="error"
                                  onClick={(e) =>
                                    handleDeleteProduct(
                                      e,
                                      product.productUid
                                    )
                                  }
                                >

                                  <DeleteTwoToneIcon />

                                </IconButton>

                              </Tooltip>

                            </TableCell>

                          </TableRow>
                        )
                      )

                    ) : (

                      <TableRow>

                        <TableCell
                          colSpan={7}
                          align="center"
                        >

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

      {/* FILTER MENU */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() =>
          setFilterAnchor(null)
        }
      >

        {statusFilters.map((status) => (

          <MenuItem
            key={status}
            selected={
              statusFilter === status
            }
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