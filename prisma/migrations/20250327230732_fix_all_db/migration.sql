/*
  Warnings:

  - You are about to drop the column `productId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `shoppingCartId` on the `ShoppingCartProduct` table. All the data in the column will be lost.
  - You are about to drop the `ShoppingCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ShoppingCartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingCart" DROP CONSTRAINT "ShoppingCart_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingCartProduct" DROP CONSTRAINT "ShoppingCartProduct_shoppingCartId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "ShoppingCartProduct" DROP COLUMN "shoppingCartId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ShoppingCart";

-- CreateTable
CREATE TABLE "PaymentProduct" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PaymentProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingCartProduct" ADD CONSTRAINT "ShoppingCartProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentProduct" ADD CONSTRAINT "PaymentProduct_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentProduct" ADD CONSTRAINT "PaymentProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
