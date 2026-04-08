import Link from "next/link";

export default function BlogList() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách bài viết</h1>
      <ul className="list-disc ml-5 text-blue-600">
        <li>
          <Link href="/blog/bai-viet-1">Bài viết 1</Link>
        </li>
        <li>
          <Link href="/blog/bai-viet-2">Bài viết 2</Link>
        </li>
      </ul>
      <div className="mt-4">
        <Link href="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
          &larr; Về trang chủ
        </Link>
      </div>
    </div>
  );
}
