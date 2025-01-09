/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [email] NVARCHAR(1000) NOT NULL,
[password] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_password_key] UNIQUE NONCLUSTERED ([password]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
