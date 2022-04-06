/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `CoffeeShopPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_name_key" ON "CoffeeShop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShopPhoto_url_key" ON "CoffeeShopPhoto"("url");
