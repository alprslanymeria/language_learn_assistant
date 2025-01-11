BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[LiveSession] DROP CONSTRAINT [LiveSession_userId_fkey];

-- DropIndex
ALTER TABLE [dbo].[LiveSession] DROP CONSTRAINT [LiveSession_userId_key];

-- AlterTable
ALTER TABLE [dbo].[LiveSession] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[LiveSession] ADD CONSTRAINT [LiveSession_userId_key] UNIQUE NONCLUSTERED ([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[LiveSession] ADD CONSTRAINT [LiveSession_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
