BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[WordSession] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [word] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL,
    CONSTRAINT [WordSession_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[WordSession] ADD CONSTRAINT [WordSession_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[OldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
