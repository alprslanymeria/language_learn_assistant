BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Language] (
    [id] INT NOT NULL IDENTITY(1,1),
    [language] NVARCHAR(1000) NOT NULL,
    [picturePath] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Language_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Language_language_key] UNIQUE NONCLUSTERED ([language]),
    CONSTRAINT [Language_picturePath_key] UNIQUE NONCLUSTERED ([picturePath])
);

-- CreateTable
CREATE TABLE [dbo].[Practice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [practice] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Practice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Book] (
    [id] INT NOT NULL IDENTITY(1,1),
    [languageId] INT NOT NULL,
    [bookName] NVARCHAR(1000) NOT NULL,
    [imagePath] NVARCHAR(1000) NOT NULL,
    [sourcePath] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Book_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Book_bookName_key] UNIQUE NONCLUSTERED ([bookName]),
    CONSTRAINT [Book_imagePath_key] UNIQUE NONCLUSTERED ([imagePath])
);

-- CreateTable
CREATE TABLE [dbo].[Film] (
    [id] INT NOT NULL IDENTITY(1,1),
    [languageId] INT NOT NULL,
    [filmName] NVARCHAR(1000) NOT NULL,
    [imagePath] NVARCHAR(1000) NOT NULL,
    [sourcePath] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Film_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Film_filmName_key] UNIQUE NONCLUSTERED ([filmName]),
    CONSTRAINT [Film_imagePath_key] UNIQUE NONCLUSTERED ([imagePath])
);

-- CreateTable
CREATE TABLE [dbo].[OldSession] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [OldSession_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [rate] INT NOT NULL,
    CONSTRAINT [OldSession_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OldSession_oldSessionId_key] UNIQUE NONCLUSTERED ([oldSessionId])
);

-- CreateTable
CREATE TABLE [dbo].[LiveSession] (
    [id] INT NOT NULL IDENTITY(1,1),
    [liveSessionId] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [LiveSession_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [LiveSession_liveSessionId_key] UNIQUE NONCLUSTERED ([liveSessionId]),
    CONSTRAINT [LiveSession_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[_LanguagePractices] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_LanguagePractices_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_LanguagePractices_B_index] ON [dbo].[_LanguagePractices]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [Book_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Film] ADD CONSTRAINT [Film_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OldSession] ADD CONSTRAINT [OldSession_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OldSession] ADD CONSTRAINT [OldSession_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OldSession] ADD CONSTRAINT [OldSession_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[LiveSession] ADD CONSTRAINT [LiveSession_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LanguagePractices] ADD CONSTRAINT [_LanguagePractices_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Language]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LanguagePractices] ADD CONSTRAINT [_LanguagePractices_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Practice]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
