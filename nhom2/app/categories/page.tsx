import Link from "next/link";

export default function Categories() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Danh mục bài viết</h1>
      <ul className="list-disc ml-5">
        <li>Công nghệ</li>
        <li>Đời sống</li>
        <li>Học tập</li>
      </ul>
      <div className="mt-4">
        <Link href="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
          &larr; Về trang chủ
        </Link>
      </div>
    </div>
  );
}
