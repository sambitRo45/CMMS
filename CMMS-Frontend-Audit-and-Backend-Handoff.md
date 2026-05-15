# CMMS Frontend Audit and Backend Handoff

## 1. Project Overview

This frontend is a React 17 / Create React App project using MUI, `react-router-dom`, `react-helmet-async`, `qrcode.react`, and `react-dropzone`. The CMMS work is implemented inside the existing authenticated `/app` shell, which is rendered by `ExtendedSidebarLayout`.

The new CMMS feature area is frontend-only. It uses static TypeScript arrays and component-local state, with TODO comments marking where backend APIs should replace mock behavior later.

Current implemented flow:

- `/app/home` renders Home as the CMMS landing page.
- `/app/dashboard` renders Dashboard as the module hub.
- `/app/dashboard/product-lifecycle` renders the Product Lifecycle Log list.
- `/app/dashboard/product-lifecycle/new` renders the Add Product form.
- `/app/dashboard/product-lifecycle/:productId` renders Product Details.

Important audit note: the current sidebar source contains only `Home` and `Dashboard`. It does not preserve the rest of the old sidebar entries. If the desired requirement is "add Home and Dashboard at the top while keeping the rest unchanged", `src/layouts/ExtendedSidebarLayout/Sidebar/SidebarMenu/items.ts` needs to be restored and extended rather than replaced.

## 2. Files Changed

### Created

- `src/content/own/CMMS/types.ts`
  - Defines local CMMS frontend types: module status, lifecycle stage, product status, summary card, module card, product attachments, product documents, product events, digital twin metrics, and product record shape.

- `src/content/own/CMMS/mockData.ts`
  - Stores all frontend-only mock data for summary cards, module cards, product records, nested product detail data, and lifecycle stages.

- `src/content/own/CMMS/components.tsx`
  - Contains reusable CMMS UI helpers:
    - `SummaryCard`
    - `ModuleCard`
    - `getProductStatusColor`

- `src/content/own/CMMS/HomePage.tsx`
  - Renders the Home landing page with summary cards and Explore Modules cards.

- `src/content/own/CMMS/DashboardPage.tsx`
  - Renders the Dashboard module hub with summary cards and module tiles.

- `src/content/own/CMMS/ProductLifecycle/ListPage.tsx`
  - Renders Product Lifecycle Log list with search, status filter, table, row navigation, Add Product navigation, and future edit/delete placeholders.

- `src/content/own/CMMS/ProductLifecycle/NewProductPage.tsx`
  - Renders Add Product form with all requested sections, drag/drop attachments, product image upload UI, QR preview, lifecycle stage selector, and save/draft/clear/cancel actions.

- `src/content/own/CMMS/ProductLifecycle/ProductDetailsPage.tsx`
  - Renders read-only product details with product image, QR code, metadata, status badge, detail tabs, documents, digital twin metrics, and unknown-product fallback.

### Modified

- `src/router/app.tsx`
  - Adds lazy-loaded CMMS routes under `/app`.
  - Adds `/app` index redirect to `/app/home`.
  - Current diff also shows the older `/app/products` routes removed.

- `src/router/index.tsx`
  - Changes root redirect from `/app/work-orders` to `/app/home`.

- `src/layouts/ExtendedSidebarLayout/Sidebar/SidebarMenu/items.ts`
  - Replaces the previous sidebar menu with only:
    - `Home` -> `/app/home`
    - `Dashboard` -> `/app/dashboard`
  - Adds `matchPrefix?: boolean` to support keeping Dashboard active on nested dashboard routes.

- `src/layouts/ExtendedSidebarLayout/Sidebar/SidebarMenu/index.tsx`
  - Uses `end: !item.matchPrefix` so `/app/dashboard/product-lifecycle...` keeps Dashboard active.

- `src/layouts/ExtendedSidebarLayout/Sidebar/SidebarMenu/item.tsx`
  - Adds `className={clsx({ active })}` to single-link menu buttons so active styling works for Home/Dashboard.

- `src/i18n/translations/en.ts`
  - Current diff removes old product/manufacture/site translation keys. This appears related to removal of the older `/app/products` placeholder area, not the new CMMS pages.

### Reused

- `src/App.tsx`
  - No CMMS-specific changes required. It still uses `useRoutes(router)` and wraps the app in global providers.

- `src/layouts/ExtendedSidebarLayout`
  - Reused for authenticated app layout, header, fixed sidebar, and `<Outlet />` route rendering.

- `src/contexts/TitleContext.tsx`
  - Reused by all CMMS pages to set header titles.

- `src/contexts/CustomSnackBarContext`
  - Reused by `NewProductPage` for mock save/draft feedback.

- Existing MUI, React Router, Helmet, QR, and Dropzone dependencies.

## 3. Folder Structure

```text
src/
  content/
    own/
      CMMS/
        components.tsx
        DashboardPage.tsx
        HomePage.tsx
        mockData.ts
        types.ts
        ProductLifecycle/
          ListPage.tsx
          NewProductPage.tsx
          ProductDetailsPage.tsx
  layouts/
    ExtendedSidebarLayout/
      Sidebar/
        SidebarMenu/
          index.tsx
          item.tsx
          items.ts
  router/
    app.tsx
    index.tsx
```

## 4. Component Structure

### App Shell

- `src/App.tsx`
  - Calls `useRoutes(router)`.
  - Renders route content inside global providers.

- `src/router/index.tsx`
  - Wraps `/app` routes with:
    - `Authenticated`
    - `ExtendedSidebarLayout`

- `ExtendedSidebarLayout`
  - Renders `Header`, `Sidebar`, and the route `<Outlet />`.

### CMMS Shared Components

- `SummaryCard`
  - Input: `SummaryCardData`
  - Used by `HomePage` and `DashboardPage`
  - Displays icon, label, value, and trend.

- `ModuleCard`
  - Input: `ModuleCardData`, optional `disabled`, and `onOpen`
  - Used by `HomePage` and `DashboardPage`
  - Displays module icon, title, description, status chip, and View Module button.

- `getProductStatusColor`
  - Maps product statuses to MUI chip colors.

### Page Components

- `HomePage`
  - Renders summary cards and Explore Modules.
  - Product Lifecycle module navigates to `/app/dashboard/product-lifecycle`.
  - Non-active modules navigate to `/app/dashboard`.

- `DashboardPage`
  - Renders summary cards and module hub.
  - Product Lifecycle module is enabled.
  - Other modules are rendered disabled as later-phase modules.

- `ProductLifecycleListPage`
  - Renders breadcrumb, title, search input, status filter menu, Add Product button, product table, row click navigation, and action icons.

- `NewProductPage`
  - Renders a large controlled form.
  - Uses `useDropzone` for attachments and product image UI.
  - Uses `QRCodeSVG` to preview a QR code from `productUid`.

- `ProductDetailsPage`
  - Looks up a product by `productId` from mock data.
  - Renders product summary, QR, metadata, and tabbed detail sections.
  - Defines local helper components:
    - `DetailField`
    - `EventList`
    - `DocumentsTable`
    - `DigitalTwinMetrics`

## 5. Route Structure

All new CMMS routes are inside the authenticated `/app` route.

```text
/                  -> redirects to /app/home
/app               -> redirects to /app/home
/app/home          -> HomePage
/app/dashboard     -> DashboardPage
/app/dashboard/product-lifecycle
                   -> ProductLifecycleListPage
/app/dashboard/product-lifecycle/new
                   -> NewProductPage
/app/dashboard/product-lifecycle/:productId
                   -> ProductDetailsPage
```

Navigation flow:

```text
Home
  -> Product Lifecycle module card
  -> /app/dashboard/product-lifecycle

Dashboard
  -> Product Lifecycle tile
  -> /app/dashboard/product-lifecycle

Product Lifecycle List
  -> Add Product
  -> /app/dashboard/product-lifecycle/new

Product Lifecycle List
  -> product row or view action
  -> /app/dashboard/product-lifecycle/:productId

Product Details
  -> Back to Product List
  -> /app/dashboard/product-lifecycle
```

## 6. State Management / Data Flow

The CMMS feature currently does not use Redux slices, API clients, persistence, or backend calls.

Current data flow:

- `mockData.ts` exports static arrays.
- `HomePage` and `DashboardPage` read:
  - `cmmsSummaryCards`
  - `cmmsModules`
- `ProductLifecycleListPage` reads:
  - `mockProducts`
  - Local `useState` controls `searchQuery`, `statusFilter`, and filter menu anchor.
  - `useMemo` filters products client-side.
- `NewProductPage` uses:
  - Local `useState` for form values.
  - Local `useState` for dropped attachment files and image file.
  - `showSnackBar` for mock save/draft messages.
- `ProductDetailsPage` uses:
  - `useParams()` to read `productId`.
  - `useMemo` to find the product in `mockProducts`.
  - Local `useState` for selected tab.

Ready-to-replace frontend-only state:

- Product list loading should become API query state.
- Search and filter should move to server query params when datasets grow.
- Add Product form state should submit payloads to backend endpoints.
- Attachment and image state should upload to backend storage.
- Product details lookup should become an API fetch by ID.

## 7. Mock Data Structure

### `cmmsSummaryCards`

Located in `src/content/own/CMMS/mockData.ts`.

Contains 5 summary cards:

- Total Products
- Manufacturing Orders
- Maintenance Tickets
- Assets Deployed
- Active Users

Each item has:

- `id`
- `label`
- `value`
- `trend`
- `color`
- `icon`

Future backend source:

- `GET /api/cmms/summary`

### `cmmsModules`

Contains 7 module cards:

- Product Lifecycle Log
- Manufacturing Execution Log
- Maintenance & Service Log
- Inventory & Procurement
- Logistics & Shipment Tracking
- User & Role Management
- Document Management

Each item has:

- `id`
- `title`
- `description`
- `icon`
- `color`
- `path`
- `status`

Current status:

- Product Lifecycle Log is `active`.
- All other modules are `coming-soon`.

Future backend source:

- This can remain frontend config, or later come from `GET /api/cmms/modules` if module access, licensing, or role visibility becomes backend-driven.

### `mockProducts`

Contains 4 product records:

- `PL-1001` - Smart Sensor Unit
- `PL-1002` - Industrial Gateway
- `PL-1003` - Control Panel XT
- `PL-1004` - Power Module 500W

Each product includes:

- Product master identity:
  - `id`
  - `productUid`
  - `name`
  - `category`
  - `subcategory`
  - `description`
  - `status`
  - `lifecycleStage`
- Manufacturing fields:
  - `serialNumber`
  - `productVersion`
  - `bomVersion`
  - `manufacturingBatchId`
  - `manufacturingDate`
  - `assemblyDate`
  - `qcStatus`
- Technical fields:
  - `modelNumber`
  - `partNumber`
  - `macAddress`
  - `imeiModuleId`
  - `hardwareVersion`
  - `firmwareVersion`
  - `rfidTagId`
  - `digitalTwinLink`
- Customer/location fields:
  - `assignedCustomer`
  - `installationSite`
  - `locationGps`
  - `contactPerson`
  - `contactNumber`
  - `email`
- Visual/QR fields:
  - `imageUrl`
  - `qrValue`
- Nested detail data:
  - `attachments`
  - `masterLog`
  - `logisticsTrail`
  - `maintenanceHistory`
  - `documents`
  - `auditTrail`
  - `digitalTwinMetrics`

### `lifecycleStages`

Contains:

- Design
- Prototype
- Manufacturing
- In Service
- Maintenance
- Retired

Future backend source:

- Can remain frontend enum initially.
- Should become backend/reference data if workflows, permissions, or lifecycle transitions become configurable.

## 8. Backend Integration Points

### Existing TODO Comments

- `src/content/own/CMMS/ProductLifecycle/ListPage.tsx`
  - `// TODO: Replace mock product list with backend API call.`
  - `// TODO: Update / delete product using backend API.`

- `src/content/own/CMMS/ProductLifecycle/NewProductPage.tsx`
  - `// TODO: Upload attachments using backend API.`
  - `// TODO: Upload product image using backend API.`
  - `// TODO: Connect Save Product button to backend endpoint.`
  - `// TODO: Connect Save as Draft button to backend endpoint.`

- `src/content/own/CMMS/ProductLifecycle/ProductDetailsPage.tsx`
  - `// TODO: Fetch product details from backend by ID.`

### Recommended API Endpoints

Summary and module hub:

- `GET /api/cmms/summary`
  - Returns dashboard summary counts and trends.

- `GET /api/cmms/modules`
  - Optional. Use only if modules, permissions, or feature flags should be backend-controlled.

Product list:

- `GET /api/products`
  - Query params:
    - `search`
    - `status`
    - `category`
    - `subcategory`
    - `lifecycleStage`
    - `page`
    - `size`
    - `sort`
  - Used by Product Lifecycle list.

Product details:

- `GET /api/products/:productId`
  - Returns full product master data and nested detail sections, or a normalized product object plus detail URLs.

Product create/draft:

- `POST /api/products`
  - Creates a product.

- `POST /api/products/drafts`
  - Creates a draft product.

Alternative:

- `POST /api/products` with `saveMode: "DRAFT" | "SUBMIT"`.

Product update/delete:

- `PATCH /api/products/:productId`
  - Partial update.

- `PUT /api/products/:productId`
  - Full update, if the backend prefers full replacement.

- `DELETE /api/products/:productId`
  - Delete or archive product. Prefer soft-delete/archive if audit trail matters.

Uploads:

- `POST /api/products/:productId/attachments`
  - Multipart upload for product documents.

- `POST /api/products/:productId/image`
  - Multipart upload for product image.

- `DELETE /api/products/:productId/attachments/:attachmentId`
  - Remove uploaded attachment.

Nested product data:

- `GET /api/products/:productId/master-log`
- `GET /api/products/:productId/logistics-trail`
- `GET /api/products/:productId/maintenance-history`
- `GET /api/products/:productId/documents`
- `GET /api/products/:productId/digital-twin`
- `GET /api/products/:productId/audit-trail`

These can also be bundled into `GET /api/products/:productId` for the first backend version to reduce frontend orchestration.

Reference data:

- `GET /api/product-categories`
- `GET /api/product-subcategories?categoryId=...`
- `GET /api/lifecycle-stages`
- `GET /api/product-statuses`
- `GET /api/qc-statuses`
- `GET /api/customers`
- `GET /api/sites`

## 9. What Is Ready for Backend

- Route structure is already in place under `/app`.
- Product list page has the right UI surface for server-loaded rows.
- Search/filter controls are present and can be connected to query params.
- Add Product form has the required field coverage.
- Dropzone UI is ready to call upload APIs.
- QR code preview is already client-rendered using `qrcode.react`.
- Product Details page has the layout needed for full backend records.
- Unknown product fallback is present.
- Backend TODO comments are placed near the correct integration seams.
- Shared `ProductRecord` and related TypeScript interfaces provide a starting contract for backend response DTOs.

## 10. What Still Needs Backend

- Real product persistence.
- Product list API and pagination.
- Product details API by product ID.
- Product create and draft APIs.
- Product update/delete/archive APIs.
- Attachment and image upload/storage.
- Server-side validation.
- Product UID generation or validation.
- Category/subcategory reference data.
- Customer and installation site reference data.
- Lifecycle transition rules.
- QC/status workflow rules.
- Audit trail creation.
- Digital twin integration.
- Document management integration.
- Authorization rules per module/action.
- Error/loading/empty states driven by API responses.
- Optimistic updates or refetch strategy after create/update/delete.

## 11. Notes for Future Development

- Keep CMMS code self-contained under `src/content/own/CMMS` unless shared pieces become useful across the rest of the product.
- Decide whether backend data should use existing Redux Toolkit slice patterns from the current app or a new query abstraction. The rest of the app already uses Redux slices for many entities.
- Align backend DTO names with the current frontend `ProductRecord` shape or add a mapper layer to avoid spreading API naming details through components.
- Add real loading and error UI before wiring APIs.
- Add form validation before submitting to backend.
- Consider moving `ProductFormValues` from `NewProductPage.tsx` into `types.ts` once backend payloads are finalized.
- Decide whether `cmmsModules` remains static frontend config or becomes role/feature-driven backend data.
- If the product list grows, replace client-side filtering with server-side filtering and pagination.
- If the intended sidebar behavior is "Home and Dashboard plus existing old sidebar", restore the previous `ownMenuItems` entries and insert the two new items at the top.
- If the intended sidebar behavior is "only Home and Dashboard", the current sidebar implementation matches that behavior.
- The current CMMS page labels are hardcoded English strings; add translation keys if full i18n support is required.

## 12. Risk / Improvement Areas

### Sidebar Scope Mismatch

The request says Home and Dashboard were added at the top while keeping the rest of the sidebar unchanged, but the current code only contains Home and Dashboard in `items.ts`. This is the highest-impact mismatch to resolve before backend work.

### Removed Older Product Placeholder Routes

The current route diff shows older `/app/products/manufacture` and `/app/products/site` routes removed from `src/router/app.tsx`, and related translation keys removed from `en.ts`. Confirm this removal is intentional.

### No Real Persistence

Saving a product only shows a snackbar and navigates back to the list. It does not add the new product to the mock list.

### No Validation

The Add Product form currently has no required-field validation, type validation, email validation, date validation, or file validation.

### No Pagination

The Product Lifecycle list filters a local array. Backend implementation should add pagination before real data is large.

### Upload UI Is Placeholder Only

Files are held in component state. There is no upload progress, file validation, retry, preview, or delete behavior.

### Product Details Data Is Bundled

The mock `ProductRecord` bundles logs, documents, maintenance, digital twin data, and audit trail into one object. Backend should decide whether to return one large details payload or split tab data into separate endpoints.

### Hardcoded Asset Paths

Product images use existing static assets such as `/static/images/features/asset-hero.png`. Backend should return real product image URLs later.

### Authorization Not Modeled

The UI does not yet hide Product Lifecycle actions by permission. Backend and frontend should define access rules for create, view, update, delete/archive, upload, and audit access.

### Current Build Status

`npm.cmd run build` completed successfully. The build emitted existing dependency source-map/deprecation warnings from installed packages, not CMMS-specific compile errors.
