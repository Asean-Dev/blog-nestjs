"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../generated/prisma/index.js");
const seed_user_1 = require("./data/seed-user");
const seed_blog_1 = require("./data/seed-blog");
const prisma = new prisma_1.PrismaClient();
async function main() {
    const user = await prisma.user.count();
    const blog = await prisma.blog.count();
    if (user === 0) {
        for (const data of seed_user_1.SEED_DATA_USER) {
            const result = await prisma.user.create({
                data: {
                    userName: data.userName,
                },
            });
        }
    }
    if (blog === 0) {
        for (const data of seed_blog_1.SEED_DATA_BLOG) {
            const user = await prisma.user.findFirst();
            const result = await prisma.blog.create({
                data: {
                    titles: data.titles,
                    content: data.content,
                    userId: user?.id ? user.id : 1,
                },
            });
        }
    }
}
main();
//# sourceMappingURL=seed-data.js.map