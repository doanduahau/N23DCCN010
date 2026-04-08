import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Chi tiết bài viết: {slug}</h1>
      <p className="mt-4">Nội dung của bài viết {slug} sẽ hiển thị ở đây.</p>
      <div className="mt-8">
        <Link href="/blog" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
          &larr; Trở lại danh sách bài viết
        </Link>
      </div>
    </div>
  );
}
