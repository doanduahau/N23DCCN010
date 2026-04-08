import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Trang chủ Blog</h1>
      <ul className="list-disc ml-5 text-blue-600 dark:text-blue-400">
        <li>
          <Link href="/blog">Danh sách bài viết</Link>
        </li>
        <li>
          <Link href="/categories">Danh mục bài viết</Link>
        </li>
      </ul>
    </div>
  );
}
