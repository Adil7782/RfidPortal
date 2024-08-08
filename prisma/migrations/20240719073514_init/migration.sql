-- CreateTable
CREATE TABLE "ScanningPoint" (
    "id" TEXT NOT NULL,
    "pointNo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanningPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionLine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "unit" TEXT,
    "scanningPointId" TEXT,
    "lineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BundleData" (
    "id" TEXT NOT NULL,
    "bundleBarcode" INTEGER NOT NULL,
    "bundleNo" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "startPly" INTEGER NOT NULL,
    "endPly" INTEGER NOT NULL,
    "cuttingNo" INTEGER NOT NULL,
    "cuttingDate" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "patternNo" TEXT NOT NULL,
    "poCode" TEXT NOT NULL,
    "timestampStoreIn" TEXT NOT NULL,
    "timestampStoreOut" TEXT,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BundleData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GmtData" (
    "id" TEXT NOT NULL,
    "gmtBarcode" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "shade" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "styleNo" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "partName" TEXT NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "timestampProduction" TEXT,
    "isAssembled" BOOLEAN NOT NULL DEFAULT false,
    "bundleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GmtData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rfid" (
    "id" TEXT NOT NULL,
    "rfid" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rfid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "currentPointNo" INTEGER DEFAULT 5,
    "rfidId" TEXT NOT NULL,
    "frontGmtId" TEXT NOT NULL,
    "backGmtId" TEXT NOT NULL,
    "timestampAssembled" TEXT NOT NULL,
    "timestampAssembleQc" TEXT,
    "timestampButtonOut" TEXT,
    "timestampButtonQc" TEXT,
    "timestampWashIn" TEXT,
    "timestampWashOut" TEXT,
    "timestampDryQc" TEXT,
    "timestampWetQc" TEXT,
    "timestampFinishIn" TEXT,
    "timestampFinishOut" TEXT,
    "timestampFinishLineIn" TEXT,
    "timestampFinishLineQc" TEXT,
    "timestampPackIn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pointNo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QcSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcSectionTarget" (
    "id" TEXT NOT NULL,
    "dailyTarget" INTEGER NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "qcSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QcSectionTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Defect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qcSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Defect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDefect" (
    "id" TEXT NOT NULL,
    "qcStatus" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "qcSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDefect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GmtDefect" (
    "id" TEXT NOT NULL,
    "qcStatus" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "gmtId" TEXT NOT NULL,
    "qcSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GmtDefect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductQC" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GmtQC" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ScanningPoint_pointNo_key" ON "ScanningPoint"("pointNo");

-- CreateIndex
CREATE UNIQUE INDEX "ScanningPoint_route_key" ON "ScanningPoint"("route");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionLine_name_key" ON "ProductionLine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_scanningPointId_lineId_idx" ON "User"("scanningPointId", "lineId");

-- CreateIndex
CREATE UNIQUE INDEX "BundleData_bundleBarcode_key" ON "BundleData"("bundleBarcode");

-- CreateIndex
CREATE INDEX "BundleData_userEmail_idx" ON "BundleData"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "GmtData_gmtBarcode_key" ON "GmtData"("gmtBarcode");

-- CreateIndex
CREATE INDEX "GmtData_bundleId_idx" ON "GmtData"("bundleId");

-- CreateIndex
CREATE UNIQUE INDEX "Rfid_rfid_key" ON "Rfid"("rfid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_rfidId_key" ON "Product"("rfidId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_frontGmtId_key" ON "Product"("frontGmtId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_backGmtId_key" ON "Product"("backGmtId");

-- CreateIndex
CREATE INDEX "Product_currentPointNo_rfidId_frontGmtId_backGmtId_idx" ON "Product"("currentPointNo", "rfidId", "frontGmtId", "backGmtId");

-- CreateIndex
CREATE UNIQUE INDEX "QcSection_name_key" ON "QcSection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "QcSection_pointNo_key" ON "QcSection"("pointNo");

-- CreateIndex
CREATE UNIQUE INDEX "QcSectionTarget_qcSectionId_key" ON "QcSectionTarget"("qcSectionId");

-- CreateIndex
CREATE INDEX "QcSectionTarget_userEmail_qcSectionId_idx" ON "QcSectionTarget"("userEmail", "qcSectionId");

-- CreateIndex
CREATE INDEX "Defect_qcSectionId_idx" ON "Defect"("qcSectionId");

-- CreateIndex
CREATE INDEX "ProductDefect_productId_qcSectionId_idx" ON "ProductDefect"("productId", "qcSectionId");

-- CreateIndex
CREATE INDEX "GmtDefect_gmtId_qcSectionId_idx" ON "GmtDefect"("gmtId", "qcSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductQC_AB_unique" ON "_ProductQC"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductQC_B_index" ON "_ProductQC"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GmtQC_AB_unique" ON "_GmtQC"("A", "B");

-- CreateIndex
CREATE INDEX "_GmtQC_B_index" ON "_GmtQC"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_scanningPointId_fkey" FOREIGN KEY ("scanningPointId") REFERENCES "ScanningPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "ProductionLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BundleData" ADD CONSTRAINT "BundleData_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GmtData" ADD CONSTRAINT "GmtData_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "BundleData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_currentPointNo_fkey" FOREIGN KEY ("currentPointNo") REFERENCES "ScanningPoint"("pointNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_rfidId_fkey" FOREIGN KEY ("rfidId") REFERENCES "Rfid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_frontGmtId_fkey" FOREIGN KEY ("frontGmtId") REFERENCES "GmtData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_backGmtId_fkey" FOREIGN KEY ("backGmtId") REFERENCES "GmtData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcSection" ADD CONSTRAINT "QcSection_pointNo_fkey" FOREIGN KEY ("pointNo") REFERENCES "ScanningPoint"("pointNo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcSectionTarget" ADD CONSTRAINT "QcSectionTarget_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcSectionTarget" ADD CONSTRAINT "QcSectionTarget_qcSectionId_fkey" FOREIGN KEY ("qcSectionId") REFERENCES "QcSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Defect" ADD CONSTRAINT "Defect_qcSectionId_fkey" FOREIGN KEY ("qcSectionId") REFERENCES "QcSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDefect" ADD CONSTRAINT "ProductDefect_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDefect" ADD CONSTRAINT "ProductDefect_qcSectionId_fkey" FOREIGN KEY ("qcSectionId") REFERENCES "QcSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GmtDefect" ADD CONSTRAINT "GmtDefect_gmtId_fkey" FOREIGN KEY ("gmtId") REFERENCES "GmtData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GmtDefect" ADD CONSTRAINT "GmtDefect_qcSectionId_fkey" FOREIGN KEY ("qcSectionId") REFERENCES "QcSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductQC" ADD CONSTRAINT "_ProductQC_A_fkey" FOREIGN KEY ("A") REFERENCES "Defect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductQC" ADD CONSTRAINT "_ProductQC_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductDefect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GmtQC" ADD CONSTRAINT "_GmtQC_A_fkey" FOREIGN KEY ("A") REFERENCES "Defect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GmtQC" ADD CONSTRAINT "_GmtQC_B_fkey" FOREIGN KEY ("B") REFERENCES "GmtDefect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
