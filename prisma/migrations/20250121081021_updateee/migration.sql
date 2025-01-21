BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardCategory] DROP CONSTRAINT [FlashcardCategory_languageId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardCategory] DROP CONSTRAINT [FlashcardCategory_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Word] DROP CONSTRAINT [Word_categoryName_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Word] DROP CONSTRAINT [Word_languageId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Word] DROP CONSTRAINT [Word_userId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_categoryName_fkey] FOREIGN KEY ([categoryName]) REFERENCES [dbo].[FlashcardCategory]([categoryName]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
