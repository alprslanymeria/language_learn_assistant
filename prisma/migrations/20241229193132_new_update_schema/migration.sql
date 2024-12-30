BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[OldSessions] DROP CONSTRAINT [OldSessions_languageId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[OldSessions] DROP CONSTRAINT [OldSessions_practiceId_fkey];

-- AlterTable
ALTER TABLE [dbo].[OldSessions] ALTER COLUMN [languageId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[OldSessions] ALTER COLUMN [practiceId] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[OldSessions] ADD CONSTRAINT [OldSessions_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([language]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OldSessions] ADD CONSTRAINT [OldSessions_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([practice]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
