/*
  Warnings:

  - Added the required column `oldSessionId` to the `OldSessions` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Book] ADD [languageId] NVARCHAR(1000) NOT NULL CONSTRAINT [Book_languageId_df] DEFAULT 'English';

-- AlterTable
ALTER TABLE [dbo].[Film] ADD [languageId] NVARCHAR(1000) NOT NULL CONSTRAINT [Film_languageId_df] DEFAULT 'English';

-- AlterTable
ALTER TABLE [dbo].[OldSessions] ADD [oldSessionId] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[LiveSessions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [liveSessionId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [LiveSessions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [LiveSessions_liveSessionId_key] UNIQUE NONCLUSTERED ([liveSessionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[LiveSessions] ADD CONSTRAINT [LiveSessions_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [Book_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([language]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Film] ADD CONSTRAINT [Film_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([language]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
