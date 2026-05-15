import type { ElementType } from 'react';

export type ModuleStatus = 'active' | 'coming-soon';

export type ProductLifecycleStage =
  | 'Design'
  | 'Prototype'
  | 'Manufacturing'
  | 'In Service'
  | 'Maintenance'
  | 'Retired';

export type ProductStatus =
  | 'In Service'
  | 'Manufacturing'
  | 'Maintenance'
  | 'Retired';

export interface SummaryCardData {
  id: string;
  label: string;
  value: string;
  trend: string;
  color: string;
  icon: ElementType;
}

export interface ModuleCardData {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  path: string;
  status: ModuleStatus;
}

export interface ProductAttachment {
  name: string;
  type: string;
  size: string;
  updatedAt: string;
}

export interface ProductDocument {
  id: string;
  name: string;
  category: string;
  owner: string;
  updatedAt: string;
}

export interface ProductEvent {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  owner: string;
}

export interface ProductMetric {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface ProductRecord {
  id: string;
  productUid: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  status: ProductStatus;
  serialNumber: string;
  productVersion: string;
  bomVersion: string;
  manufacturingBatchId: string;
  manufacturingDate: string;
  assemblyDate: string;
  qcStatus: string;
  lifecycleStage: ProductLifecycleStage;
  modelNumber: string;
  partNumber: string;
  macAddress: string;
  imeiModuleId: string;
  hardwareVersion: string;
  firmwareVersion: string;
  rfidTagId: string;
  digitalTwinLink: string;
  assignedCustomer: string;
  installationSite: string;
  locationGps: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  imageUrl: string;
  qrValue: string;
  attachments: ProductAttachment[];
  masterLog: ProductEvent[];
  logisticsTrail: ProductEvent[];
  maintenanceHistory: ProductEvent[];
  documents: ProductDocument[];
  auditTrail: ProductEvent[];
  digitalTwinMetrics: ProductMetric[];
}
