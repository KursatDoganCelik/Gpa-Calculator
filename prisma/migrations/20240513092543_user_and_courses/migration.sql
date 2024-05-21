-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "noteType" VARCHAR(2) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "semesterYear" INTEGER NOT NULL,
    "courseName" VARCHAR(50) NOT NULL,
    "courseNote" DECIMAL(3,2) NOT NULL,
    "courseCredit" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
