import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

import ArrowForwardTwoToneIcon
from '@mui/icons-material/ArrowForwardTwoTone';

import type {
  ModuleCardData,
  ProductStatus,
  SummaryCardData
} from './types';


// =====================================
// SUMMARY CARD
// =====================================

interface SummaryCardProps {
  item: SummaryCardData;
}

export function SummaryCard({
  item
}: SummaryCardProps) {

  const theme = useTheme();

  const Icon = item.icon;

  return (

    <Card
      sx={{
        height: '100%',
        borderRadius: 1,
        border:
          `1px solid ${theme.palette.divider}`,
        boxShadow: 'none'
      }}
    >

      <CardContent>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(item.color, 0.1),
              color: item.color,
              flexShrink: 0
            }}
          >

            <Icon />

          </Box>

          <Box minWidth={0}>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {item.label}
            </Typography>

            <Typography
              variant="h3"
              sx={{ mt: 0.5 }}
            >
              {item.value}
            </Typography>

            <Typography
              variant="caption"
              color="success.main"
            >
              {item.trend}
            </Typography>

          </Box>

        </Stack>

      </CardContent>

    </Card>
  );
}


// =====================================
// MODULE CARD
// =====================================

interface ModuleCardProps {
  module: ModuleCardData;
  disabled?: boolean;
  onOpen: () => void;
}

export function ModuleCard({
  module,
  disabled = false,
  onOpen
}: ModuleCardProps) {

  const theme = useTheme();

  const Icon = module.icon;

  return (

    <Card
      sx={{
        height: '100%',
        borderRadius: 1,
        border:
          `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        opacity:
          disabled ? 0.82 : 1
      }}
    >

      <CardActionArea
        disabled={disabled}
        onClick={onOpen}
        sx={{
          height: '100%',
          alignItems: 'stretch'
        }}
      >

        <CardContent
          sx={{
            minHeight: 210,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >

            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor:
                  alpha(module.color, 0.1),
                color: module.color
              }}
            >

              <Icon fontSize="medium" />

            </Box>

            {module.status ===
              'coming-soon' && (

              <Chip
                size="small"
                label="Later"
                variant="outlined"
              />

            )}

          </Stack>

          <Typography
            variant="h4"
            sx={{
              mt: 2,
              mb: 1
            }}
          >
            {module.title}
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ flex: 1 }}
          >
            {module.description}
          </Typography>

          <Button
            disabled={disabled}
            endIcon={
              <ArrowForwardTwoToneIcon />
            }
            sx={{
              mt: 2,
              alignSelf: 'flex-start',
              px: 0
            }}
          >
            View Module
          </Button>

        </CardContent>

      </CardActionArea>

    </Card>
  );
}


// =====================================
// STATUS COLOR
// =====================================

export function getProductStatusColor(
  status: ProductStatus
) {

  if (status === 'In Service')
    return 'success';

  if (status === 'Manufacturing')
    return 'info';

  if (status === 'Maintenance')
    return 'warning';

  return 'default';
}