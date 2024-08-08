/*
  Warnings:

  - You are about to drop the column `qcSectionId` on the `Defect` table. All the data in the column will be lost.
  - You are about to drop the column `qcSectionId` on the `GmtDefect` table. All the data in the column will be lost.
  - You are about to drop the column `qcSectionId` on the `ProductDefect` table. All the data in the column will be lost.
  - You are about to drop the `QcSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QcSectionTarget` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qcPointId` to the `Defect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qcPointId` to the `GmtDefect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qcPointId` to the `ProductDefect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Defect" DROP CONSTRAINT "Defect_qcSectionId_fkey";

-- DropForeignKey
ALTER TABLE "GmtDefect" DROP CONSTRAINT "GmtDefect_qcSectionId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDefect" DROP CONSTRAINT "ProductDefect_qcSectionId_fkey";

-- DropForeignKey
ALTER TABLE "QcSection" DROP CONSTRAINT "QcSection_pointNo_fkey";

-- DropForeignKey
ALTER TABLE "QcSectionTarget" DROP CONSTRAINT "QcSectionTarget_qcSectionId_fkey";

-- DropForeignKey
ALTER TABLE "QcSectionTarget" DROP CONSTRAINT "QcSectionTarget_userEmail_fkey";

-- DropIndex
DROP INDEX "Defect_qcSectionId_idx";

-- DropIndex
DROP INDEX "GmtDefect_gmtId_qcSectionId_idx";

-- DropIndex
DROP INDEX "ProductDefect_productId_qcSectionId_idx";

-- AlterTable
ALTER TABLE "Defect" DROP COLUMN "qcSectionId",
ADD COLUMN     "qcPointId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GmtDefect" DROP COLUMN "qcSectionId",
ADD COLUMN     "qcPointId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductDefect" DROP COLUMN "qcSectionId",
ADD COLUMN     "qcPointId" TEXT NOT NULL;

-- DropTable
DROP TABLE "QcSection";

-- DropTable
DROP TABLE "QcSectionTarget";

-- CreateIndex
CREATE INDEX "Defect_qcPointId_idx" ON "Defect"("qcPointId");

-- CreateIndex
CREATE INDEX "GmtDefect_gmtId_qcPointId_idx" ON "GmtDefect"("gmtId", "qcPointId");

-- CreateIndex
CREATE INDEX "ProductDefect_productId_qcPointId_idx" ON "ProductDefect"("productId", "qcPointId");

-- AddForeignKey
ALTER TABLE "Defect" ADD CONSTRAINT "Defect_qcPointId_fkey" FOREIGN KEY ("qcPointId") REFERENCES "ScanningPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDefect" ADD CONSTRAINT "ProductDefect_qcPointId_fkey" FOREIGN KEY ("qcPointId") REFERENCES "ScanningPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GmtDefect" ADD CONSTRAINT "GmtDefect_qcPointId_fkey" FOREIGN KEY ("qcPointId") REFERENCES "ScanningPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
