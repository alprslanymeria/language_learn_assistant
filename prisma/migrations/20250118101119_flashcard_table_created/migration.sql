BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Flashcard] (
    [id] INT NOT NULL IDENTITY(1,1),
    [languageId] INT NOT NULL,
    [deckName] NVARCHAR(1000) NOT NULL,
    [imagePath] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Flashcard_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Flashcard_deckName_key] UNIQUE NONCLUSTERED ([deckName]),
    CONSTRAINT [Flashcard_imagePath_key] UNIQUE NONCLUSTERED ([imagePath])
);

-- AddForeignKey
ALTER TABLE [dbo].[Flashcard] ADD CONSTRAINT [Flashcard_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
