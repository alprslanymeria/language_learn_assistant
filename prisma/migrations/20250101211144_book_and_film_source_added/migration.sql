BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Book] ADD [sourcePath] NVARCHAR(1000) NOT NULL CONSTRAINT [Book_sourcePath_df] DEFAULT '/pdfs/bulanti.pdf';

-- AlterTable
ALTER TABLE [dbo].[Film] ADD [sourcePath] NVARCHAR(1000) NOT NULL CONSTRAINT [Film_sourcePath_df] DEFAULT '/films/video.mp4';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
