import { PrismaClient } from "@prisma/client";
import { SEED_DATA_USER } from "./data/seed-user";
import { SEED_DATA_BLOG } from "./data/seed-blog";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.count();
  console.log("user", user);
  const blog = await prisma.blog.count();
  if (user === 0) {
    for (const data of SEED_DATA_USER) {
      const result = await prisma.user.create({
        data: {
          userName: data.userName,
        },
      });
      if (result) {
        console.log("User Success");
      }

      if (blog === 0 && result) {
        for (const data of SEED_DATA_BLOG) {
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
