"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const seed_user_1 = require("./data/seed-user");
const seed_blog_1 = require("./data/seed-blog");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.count();
    console.log("user", user);
    const blog = await prisma.blog.count();
    if (user === 0) {
        for (const data of seed_user_1.SEED_DATA_USER) {
            const result = await prisma.user.create({
                data: {
                    userName: data.userName,
                },
            });
            if (result) {
                console.log("User Success");
            }
            if (blog === 0 && result) {
                for (const data of seed_blog_1.SEED_DATA_BLOG) {
                    const resultBlog = await prisma.blog.create({
                        data: {
                            titles: data.titles,
                            content: data.content,
                            userId: result.id,
                            status: data.status,
                        },
                    });
                    if (resultBlog) {
                        console.log("Blog Success");
                    }
                }
            }
        }
    }
}
main();
//# sourceMappingURL=seed-data.js.map