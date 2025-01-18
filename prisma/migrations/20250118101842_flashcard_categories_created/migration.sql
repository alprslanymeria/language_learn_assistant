/*
  Warnings:

  - You are about to drop the `Flashcard` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Flashcard] DROP CONSTRAINT [Flashcard_languageId_fkey];

-- DropTable
DROP TABLE [dbo].[Flashcard];

-- CreateTable
CREATE TABLE [dbo].[FlashcardCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [languageId] INT NOT NULL,
    [categoryName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [FlashcardCategory_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [FlashcardCategory_categoryName_key] UNIQUE NONCLUSTERED ([categoryName])
);

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
