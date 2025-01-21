BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Book] ADD [leftSideColor] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Film] ADD [leftSideColor] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
