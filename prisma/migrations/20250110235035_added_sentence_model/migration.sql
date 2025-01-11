BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Sentence] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [original] NVARCHAR(1000) NOT NULL,
    [own] NVARCHAR(1000) NOT NULL,
    [translate] NVARCHAR(1000) NOT NULL,
    [similarity] INT NOT NULL,
    CONSTRAINT [Sentence_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Sentence] ADD CONSTRAINT [Sentence_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[OldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
