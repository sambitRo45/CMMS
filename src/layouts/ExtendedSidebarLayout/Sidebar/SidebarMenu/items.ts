import type { ReactNode } from 'react';

import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';

import { PermissionEntity } from '../../../../models/owns/role';
import { PlanFeature } from '../../../../models/owns/subscriptionPlan';
import { UiConfiguration } from '../../../../models/owns/uiConfiguration';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;
  permission?: PermissionEntity;
  planFeature?: PlanFeature;
  uiConfigKey?: keyof Omit<UiConfiguration, 'id'>;
  matchPrefix?: boolean;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  hidden?: PermissionEntity;
}

const ownMenuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Home',
        link: '/app/home',
        icon: HomeTwoToneIcon
      },
      {
        name: 'Product Lifecycle Log',
        link: '/app/product-lifecycle',
        icon: Inventory2TwoToneIcon,
        matchPrefix: true
      },
      {
        name: 'Manufacturing Execution Log',
        link: '/app/home?module=manufacturing-execution',
        icon: PrecisionManufacturingTwoToneIcon
      },
      {
        name: 'Maintenance & Service Log',
        link: '/app/home?module=maintenance-service',
        icon: HandymanTwoToneIcon
      },
      {
        name: 'Inventory & Procurement',
        link: '/app/home?module=inventory-procurement',
        icon: ReceiptTwoToneIcon
      },
      {
        name: 'Logistics & Shipment Tracking',
        link: '/app/home?module=logistics-shipment',
        icon: LocalShippingTwoToneIcon
      },
      {
        name: 'User & Role Management',
        link: '/app/home?module=user-role-management',
        icon: GroupsTwoToneIcon
      },
      {
        name: 'Document Management',
        link: '/app/home?module=document-management',
        icon: DescriptionTwoToneIcon
      }
    ]
  }
];

export default ownMenuItems;
