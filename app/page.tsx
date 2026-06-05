import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function createPost(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title || !content) return;

  await prisma.post.create({
    data: { title, content },
  });

  revalidatePath("/");
}

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        Next.js Fullstack Demo
      </h1>
      <p className="mb-6 text-gray-600">
        Ứng dụng mẫu: thêm bài viết, lưu SQLite bằng Prisma và hiển thị ra màn hình.
      </p>

      <form action={createPost} className="mb-8 rounded-xl border p-4 shadow-sm">
        <label className="mb-1 block font-medium">Tiêu đề</label>
        <input
          name="title"
          required
          className="mb-3 w-full rounded border px-3 py-2"
          placeholder="Nhập tiêu đề bài viết"
        />

        <label className="mb-1 block font-medium">Nội dung</label>
        <textarea
          name="content"
required
          className="mb-3 w-full rounded border px-3 py-2"
          placeholder="Nhập nội dung bài viết"
        />

        <button className="rounded bg-black px-4 py-2 text-white">
          Thêm bài viết
        </button>
      </form>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Danh sách bài viết</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">Chưa có bài viết nào.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="rounded-xl border p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="mt-2 text-gray-700">{post.content}</p>
                <p className="mt-2 text-sm text-gray-400">
                  {post.createdAt.toLocaleString("vi-VN")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
