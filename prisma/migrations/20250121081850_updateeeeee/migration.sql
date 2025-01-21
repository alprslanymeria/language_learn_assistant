BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Word] DROP CONSTRAINT [Word_categoryName_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_categoryName_fkey] FOREIGN KEY ([categoryName]) REFERENCES [dbo].[FlashcardCategory]([categoryName]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
