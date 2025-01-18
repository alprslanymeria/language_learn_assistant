/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Sentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FlashcardCategory` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Sentence] DROP CONSTRAINT [Sentence_oldSessionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WordSession] DROP CONSTRAINT [WordSession_oldSessionId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Language] DROP CONSTRAINT [Language_picturePath_key];

-- AlterTable
ALTER TABLE [dbo].[Book] ADD [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Film] ADD [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[FlashcardCategory] ADD [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_pkey];
ALTER TABLE [dbo].[User] ALTER COLUMN [updatedAt] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[User] DROP COLUMN [id];

-- AlterTable
ALTER TABLE [dbo].[Word] ADD [userId] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[Sentence];

-- DropTable
DROP TABLE [dbo].[WordSession];

-- CreateTable
CREATE TABLE [dbo].[SessionSentence] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [original] NVARCHAR(1000) NOT NULL,
    [own] NVARCHAR(1000) NOT NULL,
    [translate] NVARCHAR(1000) NOT NULL,
    [similarity] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [SessionSentence_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SessionWord] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [word] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL,
    CONSTRAINT [SessionWord_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [Book_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Film] ADD CONSTRAINT [Film_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SessionSentence] ADD CONSTRAINT [SessionSentence_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SessionSentence] ADD CONSTRAINT [SessionSentence_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[OldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SessionWord] ADD CONSTRAINT [SessionWord_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SessionWord] ADD CONSTRAINT [SessionWord_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[OldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
