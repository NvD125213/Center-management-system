-- CreateTable
CREATE TABLE "UserVerifyOtp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVerifyOtp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVerifyOtp" ADD CONSTRAINT "UserVerifyOtp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
