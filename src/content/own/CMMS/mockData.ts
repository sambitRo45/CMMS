import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';

import type { ModuleCardData, ProductRecord, SummaryCardData } from './types';

export const cmmsSummaryCards: SummaryCardData[] = [
  {
    id: 'total-products',
    label: 'Total Products',
    value: '12,650',
    trend: '+8.5% from last month',
    color: '#2563eb',
    icon: Inventory2TwoToneIcon
  },
  {
    id: 'manufacturing-orders',
    label: 'Manufacturing Orders',
    value: '1,285',
    trend: '+10.2% from last month',
    color: '#059669',
    icon: PrecisionManufacturingTwoToneIcon
  },
  {
    id: 'maintenance-tickets',
    label: 'Maintenance Tickets',
    value: '320',
    trend: '+12.4% from last month',
    color: '#f97316',
    icon: BuildCircleTwoToneIcon
  },
  {
    id: 'assets-deployed',
    label: 'Assets Deployed',
    value: '9,875',
    trend: '+7.8% from last month',
    color: '#7c3aed',
    icon: RoomTwoToneIcon
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: '256',
    trend: '+5.8% from last month',
    color: '#0891b2',
    icon: GroupsTwoToneIcon
  }
];

export const cmmsModules: ModuleCardData[] = [
  {
    id: 'product-lifecycle',
    title: 'Product Lifecycle Log',
    description:
      'Track every product from creation to retirement with lifecycle metadata.',
    icon: Inventory2TwoToneIcon,
    color: '#2563eb',
    path: '/app/product-lifecycle',
    status: 'active'
  },
  {
    id: 'manufacturing-execution',
    title: 'Manufacturing Execution Log',
    description:
      'Monitor manufacturing process flow from material issue to final output.',
    icon: PrecisionManufacturingTwoToneIcon,
    color: '#059669',
    path: '/app/home?module=manufacturing-execution',
    status: 'coming-soon'
  },
  {
    id: 'maintenance-service',
    title: 'Maintenance & Service Log',
    description:
      'Manage service history, maintenance activity, and repair records.',
    icon: HandymanTwoToneIcon,
    color: '#f97316',
    path: '/app/home?module=maintenance-service',
    status: 'coming-soon'
  },
  {
    id: 'inventory-procurement',
    title: 'Inventory & Procurement',
    description:
      'Track inventory, suppliers, purchase orders, and replenishment flow.',
    icon: AssignmentTurnedInTwoToneIcon,
    color: '#7c3aed',
    path: '/app/home?module=inventory-procurement',
    status: 'coming-soon'
  },
  {
    id: 'logistics-shipment',
    title: 'Logistics & Shipment Tracking',
    description:
      'Follow shipment status, dispatch notes, and delivery checkpoints.',
    icon: LocalShippingTwoToneIcon,
    color: '#0284c7',
    path: '/app/home?module=logistics-shipment',
    status: 'coming-soon'
  },
  {
    id: 'user-role-management',
    title: 'User & Role Management',
    description:
      'Manage operators, supervisors, permissions, and access control.',
    icon: PeopleAltTwoToneIcon,
    color: '#16a34a',
    path: '/app/home?module=user-role-management',
    status: 'coming-soon'
  },
  {
    id: 'document-management',
    title: 'Document Management',
    description:
      'Store and organize product documents, certificates, and manuals.',
    icon: DescriptionTwoToneIcon,
    color: '#4f46e5',
    path: '/app/home?module=document-management',
    status: 'coming-soon'
  }
];

export const mockProducts: ProductRecord[] = [
  {
    id: 'PL-1001',
    productUid: 'PRD-SENSOR-1001',
    name: 'Smart Sensor Unit',
    category: 'Electronics',
    subcategory: 'Sensor',
    description: 'IoT based sensor unit for live machine telemetry.',
    status: 'In Service',
    serialNumber: 'SN-2024-1001',
    productVersion: 'v1.2',
    bomVersion: 'BOM-2024-A',
    manufacturingBatchId: 'BATCH-001',
    manufacturingDate: '2024-02-12',
    assemblyDate: '2024-02-18',
    qcStatus: 'Passed',
    lifecycleStage: 'In Service',
    modelNumber: 'SSU-X204',
    partNumber: 'PN-SENS-204',
    macAddress: '00:1B:44:11:3A:B7',
    imeiModuleId: 'IMEI-867530900001',
    hardwareVersion: 'HW-2.1',
    firmwareVersion: 'FW-4.8.2',
    rfidTagId: 'RFID-SSU-001',
    digitalTwinLink: 'https://digital-twin.local/products/PL-1001',
    assignedCustomer: 'ABC Industries',
    installationSite: 'Main Plant - Line 2',
    locationGps: '40.7128, -74.0060',
    contactPerson: 'John Doe',
    contactNumber: '+1 234 567 890',
    email: 'john.doe@abc.com',
    imageUrl: '/static/images/features/asset-hero.png',
    qrValue: 'PL-1001 | Smart Sensor Unit | ABC Industries',
    attachments: [
      {
        name: 'QC Certificate.pdf',
        type: 'Certificate',
        size: '480 KB',
        updatedAt: '2024-02-20'
      },
      {
        name: 'Installation Guide.pdf',
        type: 'Manual',
        size: '1.2 MB',
        updatedAt: '2024-02-21'
      }
    ],
    masterLog: [
      {
        id: 'ML-1',
        label: 'Product created',
        description: 'Master record created after batch allocation.',
        timestamp: '2024-02-12 09:30',
        owner: 'Production Admin'
      },
      {
        id: 'ML-2',
        label: 'QC approved',
        description: 'Functional and connectivity checks completed.',
        timestamp: '2024-02-19 14:10',
        owner: 'Quality Team'
      }
    ],
    logisticsTrail: [
      {
        id: 'LG-1',
        label: 'Packed for shipment',
        description: 'Product packed with installation kit and documents.',
        timestamp: '2024-02-22 11:20',
        owner: 'Warehouse A'
      },
      {
        id: 'LG-2',
        label: 'Delivered',
        description: 'Received at customer site and signed by site engineer.',
        timestamp: '2024-02-24 16:45',
        owner: 'Logistics Desk'
      }
    ],
    maintenanceHistory: [
      {
        id: 'MH-1',
        label: 'Firmware inspection',
        description: 'Firmware verified after deployment stabilization.',
        timestamp: '2024-03-08 10:00',
        owner: 'Service Team'
      }
    ],
    documents: [
      {
        id: 'DOC-1',
        name: 'Warranty Card',
        category: 'Warranty',
        owner: 'Support',
        updatedAt: '2024-02-20'
      },
      {
        id: 'DOC-2',
        name: 'Calibration Report',
        category: 'Quality',
        owner: 'QC Lab',
        updatedAt: '2024-02-19'
      }
    ],
    auditTrail: [
      {
        id: 'AT-1',
        label: 'Record viewed',
        description: 'Product record opened from lifecycle log.',
        timestamp: '2024-04-01 12:05',
        owner: 'Admin'
      },
      {
        id: 'AT-2',
        label: 'Status synced',
        description: 'Device health synced from digital twin service.',
        timestamp: '2024-04-02 08:15',
        owner: 'System'
      }
    ],
    digitalTwinMetrics: [
      { label: 'CPU Usage', value: '45%', status: 'info' },
      { label: 'Memory Usage', value: '60%', status: 'info' },
      { label: 'Temperature', value: '42 C', status: 'warning' },
      { label: 'Sync Status', value: 'Synced', status: 'success' }
    ]
  },
  {
    id: 'PL-1002',
    productUid: 'PRD-GATEWAY-1002',
    name: 'Industrial Gateway',
    category: 'Electronics',
    subcategory: 'Gateway',
    description: 'Edge computing gateway for multi-device connectivity.',
    status: 'Manufacturing',
    serialNumber: 'SN-2024-1002',
    productVersion: 'v2.0',
    bomVersion: 'BOM-2024-B',
    manufacturingBatchId: 'BATCH-002',
    manufacturingDate: '2024-03-04',
    assemblyDate: '2024-03-09',
    qcStatus: 'In Progress',
    lifecycleStage: 'Manufacturing',
    modelNumber: 'IGW-E500',
    partNumber: 'PN-GTW-500',
    macAddress: '00:1B:44:11:3A:C8',
    imeiModuleId: 'IMEI-867530900002',
    hardwareVersion: 'HW-3.0',
    firmwareVersion: 'FW-5.1.0',
    rfidTagId: 'RFID-IGW-002',
    digitalTwinLink: 'https://digital-twin.local/products/PL-1002',
    assignedCustomer: 'Northwind Manufacturing',
    installationSite: 'Factory 3 - Control Room',
    locationGps: '41.8781, -87.6298',
    contactPerson: 'Maria Chen',
    contactNumber: '+1 555 182 204',
    email: 'maria.chen@northwind.example',
    imageUrl: '/static/images/features/part-hero.png',
    qrValue: 'PL-1002 | Industrial Gateway | Northwind Manufacturing',
    attachments: [
      {
        name: 'Assembly Checklist.xlsx',
        type: 'Checklist',
        size: '210 KB',
        updatedAt: '2024-03-09'
      }
    ],
    masterLog: [
      {
        id: 'ML-1',
        label: 'Manufacturing started',
        description: 'Batch accepted by production cell.',
        timestamp: '2024-03-04 08:40',
        owner: 'Production Admin'
      }
    ],
    logisticsTrail: [],
    maintenanceHistory: [],
    documents: [
      {
        id: 'DOC-1',
        name: 'Manufacturing Traveler',
        category: 'Production',
        owner: 'Production',
        updatedAt: '2024-03-04'
      }
    ],
    auditTrail: [
      {
        id: 'AT-1',
        label: 'BOM linked',
        description: 'BOM-2024-B linked to product master.',
        timestamp: '2024-03-04 09:12',
        owner: 'System'
      }
    ],
    digitalTwinMetrics: [
      { label: 'Provisioning', value: 'Pending', status: 'warning' },
      { label: 'Test Coverage', value: '72%', status: 'info' },
      { label: 'Sync Status', value: 'Queued', status: 'warning' }
    ]
  },
  {
    id: 'PL-1003',
    productUid: 'PRD-PANEL-1003',
    name: 'Control Panel XT',
    category: 'Machinery',
    subcategory: 'Panel',
    description: 'Main control panel for automated processing lines.',
    status: 'In Service',
    serialNumber: 'SN-2024-1003',
    productVersion: 'v3.4',
    bomVersion: 'BOM-2024-C',
    manufacturingBatchId: 'BATCH-003',
    manufacturingDate: '2024-01-16',
    assemblyDate: '2024-01-23',
    qcStatus: 'Passed',
    lifecycleStage: 'In Service',
    modelNumber: 'CP-XT-900',
    partNumber: 'PN-CTRL-900',
    macAddress: '00:1B:44:11:3A:D9',
    imeiModuleId: 'MOD-XT-900-1003',
    hardwareVersion: 'HW-5.2',
    firmwareVersion: 'FW-7.0.1',
    rfidTagId: 'RFID-CPX-003',
    digitalTwinLink: 'https://digital-twin.local/products/PL-1003',
    assignedCustomer: 'Contoso Metals',
    installationSite: 'Press Shop - Bay 4',
    locationGps: '34.0522, -118.2437',
    contactPerson: 'Alex Rivera',
    contactNumber: '+1 555 420 811',
    email: 'alex.rivera@contoso.example',
    imageUrl: '/static/images/features/pm-hero.png',
    qrValue: 'PL-1003 | Control Panel XT | Contoso Metals',
    attachments: [
      {
        name: 'Wiring Diagram.pdf',
        type: 'Engineering',
        size: '2.4 MB',
        updatedAt: '2024-01-25'
      }
    ],
    masterLog: [
      {
        id: 'ML-1',
        label: 'Commissioned',
        description: 'Installed and commissioned by field engineer.',
        timestamp: '2024-01-28 13:30',
        owner: 'Field Service'
      }
    ],
    logisticsTrail: [
      {
        id: 'LG-1',
        label: 'Dispatched',
        description: 'Moved from finished goods to customer site.',
        timestamp: '2024-01-26 09:10',
        owner: 'Warehouse A'
      }
    ],
    maintenanceHistory: [
      {
        id: 'MH-1',
        label: 'Preventive maintenance',
        description: 'Terminal torque and enclosure checks completed.',
        timestamp: '2024-04-12 15:00',
        owner: 'Maintenance Team'
      }
    ],
    documents: [
      {
        id: 'DOC-1',
        name: 'Commissioning Report',
        category: 'Service',
        owner: 'Field Service',
        updatedAt: '2024-01-28'
      }
    ],
    auditTrail: [
      {
        id: 'AT-1',
        label: 'Maintenance record added',
        description: 'Preventive maintenance event added to log.',
        timestamp: '2024-04-12 15:12',
        owner: 'Maintenance Team'
      }
    ],
    digitalTwinMetrics: [
      { label: 'Runtime', value: '1,284 h', status: 'info' },
      { label: 'Temperature', value: '38 C', status: 'success' },
      { label: 'Sync Status', value: 'Synced', status: 'success' }
    ]
  },
  {
    id: 'PL-1004',
    productUid: 'PRD-POWER-1004',
    name: 'Power Module 500W',
    category: 'Electronics',
    subcategory: 'Power',
    description: '500W power module for ruggedized industrial equipment.',
    status: 'Maintenance',
    serialNumber: 'SN-2024-1004',
    productVersion: 'v1.0',
    bomVersion: 'BOM-2023-P',
    manufacturingBatchId: 'BATCH-010',
    manufacturingDate: '2023-11-08',
    assemblyDate: '2023-11-13',
    qcStatus: 'Passed',
    lifecycleStage: 'Maintenance',
    modelNumber: 'PM-500W',
    partNumber: 'PN-PWR-500',
    macAddress: 'N/A',
    imeiModuleId: 'MOD-PWR-500-1004',
    hardwareVersion: 'HW-1.0',
    firmwareVersion: 'N/A',
    rfidTagId: 'RFID-PWR-004',
    digitalTwinLink: 'https://digital-twin.local/products/PL-1004',
    assignedCustomer: 'Globex Automation',
    installationSite: 'Packaging Line - Panel 7',
    locationGps: '29.7604, -95.3698',
    contactPerson: 'Priya Nair',
    contactNumber: '+1 555 602 128',
    email: 'priya.nair@globex.example',
    imageUrl: '/static/images/features/asset-hero.png',
    qrValue: 'PL-1004 | Power Module 500W | Globex Automation',
    attachments: [
      {
        name: 'Service Ticket MST-7721.pdf',
        type: 'Service',
        size: '360 KB',
        updatedAt: '2024-04-08'
      }
    ],
    masterLog: [
      {
        id: 'ML-1',
        label: 'Returned for service',
        description: 'Power stability issue reported by customer.',
        timestamp: '2024-04-08 10:45',
        owner: 'Support Desk'
      }
    ],
    logisticsTrail: [
      {
        id: 'LG-1',
        label: 'Received at service center',
        description: 'Unit received and assigned to repair queue.',
        timestamp: '2024-04-09 09:00',
        owner: 'Service Center'
      }
    ],
    maintenanceHistory: [
      {
        id: 'MH-1',
        label: 'Diagnostic started',
        description: 'Input voltage tolerance and thermal checks in progress.',
        timestamp: '2024-04-09 11:30',
        owner: 'Repair Technician'
      }
    ],
    documents: [
      {
        id: 'DOC-1',
        name: 'Failure Analysis Draft',
        category: 'Service',
        owner: 'Repair Technician',
        updatedAt: '2024-04-10'
      }
    ],
    auditTrail: [
      {
        id: 'AT-1',
        label: 'Status changed',
        description: 'Lifecycle stage changed from In Service to Maintenance.',
        timestamp: '2024-04-08 10:50',
        owner: 'Support Desk'
      }
    ],
    digitalTwinMetrics: [
      { label: 'Repair Stage', value: 'Diagnostics', status: 'warning' },
      { label: 'Last Sync', value: '2 days ago', status: 'warning' }
    ]
  }
];

export const lifecycleStages = [
  'Design',
  'Prototype',
  'Manufacturing',
  'In Service',
  'Maintenance',
  'Retired'
] as const;
