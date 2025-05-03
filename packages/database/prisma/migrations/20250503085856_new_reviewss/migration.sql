-- CreateTable
CREATE TABLE "review" (
    "id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);
