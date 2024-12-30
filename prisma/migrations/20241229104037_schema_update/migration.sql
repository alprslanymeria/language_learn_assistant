BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Language] (
    [id] INT NOT NULL IDENTITY(1,1),
    [language] NVARCHAR(1000) NOT NULL,
    [picture] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Language_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Language_language_key] UNIQUE NONCLUSTERED ([language]),
    CONSTRAINT [Language_picture_key] UNIQUE NONCLUSTERED ([picture])
);

-- CreateTable
CREATE TABLE [dbo].[Practice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [practice] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Practice_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Practice_practice_key] UNIQUE NONCLUSTERED ([practice])
);

-- CreateTable
CREATE TABLE [dbo].[OldSessions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [OldSessions_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [rate] INT NOT NULL,
    CONSTRAINT [OldSessions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_LanguageToPractice] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_LanguageToPractice_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_LanguageToPractice_B_index] ON [dbo].[_LanguageToPractice]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[OldSessions] ADD CONSTRAINT [OldSessions_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OldSessions] ADD CONSTRAINT [OldSessions_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OldSessions] ADD CONSTRAINT [OldSessions_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LanguageToPractice] ADD CONSTRAINT [_LanguageToPractice_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Language]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LanguageToPractice] ADD CONSTRAINT [_LanguageToPractice_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Practice]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
