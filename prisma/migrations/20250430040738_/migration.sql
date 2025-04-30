-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "userId" INTEGER NOT NULL,
    "titles" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "BlogStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");

-- CreateIndex
CREATE INDEX "user_id_uuid_idx" ON "user"("id", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "blog_uuid_key" ON "blog"("uuid");

-- CreateIndex
CREATE INDEX "blog_id_uuid_idx" ON "blog"("id", "uuid");

-- AddForeignKey
ALTER TABLE
    "blog"
ADD
    CONSTRAINT "blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;