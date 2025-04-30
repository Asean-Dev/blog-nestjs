# 🧠 NestJS API with Prisma + Supabase or PostgreSQL local

## 📦 Tech Stack

- **NestJS** – Scalable server-side framework
- **Prisma** – Type-safe ORM with PostgreSQL
- **Supabase** – Database hosting (PostgreSQL)
- **TypeScript** – Typed JavaScript
- **PostgreSQL Local** – Database hosting (PostgreSQL)

---

## 🚀 Getting Started

### 1. ติดตั้ง project

```
npm install
```

### 2. ทำ .env

```
#supabase
DATABASE_URL="postgresql://postgres.wivlegpyvkeqqobzvlod:P@ssw0rd@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
#หรือ Local
#DATABASE_URL="postgresql://[username]:[pass]@localhost:9000?schema=public"
PORT=3441
JWT_SECRET=TestKey
JWT_EXPIRES_IN=1h
```

### 3. ถ้าใช้ supabase

```
npm run start:dev
```

### 4. ถ้าใช้ Local

## 🚀 เปิก comment ใน .env setup postgresql ให้เรียบร้อย เเล้วรันคำสั่งตามนี้

```
npx prisma generate

npx prisma db push

```

### 5. ทำการ Seed Data เบื้องต้น

```
npx prisma db seed

npm run start:dev
```

### เริ่มรัน project next.js ได้เลย
