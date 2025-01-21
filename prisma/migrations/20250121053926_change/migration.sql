/*
  Warnings:

  - Added the required column `categoryName` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Word] ADD [categoryName] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_categoryName_fkey] FOREIGN KEY ([categoryName]) REFERENCES [dbo].[FlashcardCategory]([categoryName]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
