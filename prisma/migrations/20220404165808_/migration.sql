-- CreateTable
CREATE TABLE "_FollowRelationship" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRelationship_AB_unique" ON "_FollowRelationship"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRelationship_B_index" ON "_FollowRelationship"("B");

-- AddForeignKey
ALTER TABLE "_FollowRelationship" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowRelationship" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
