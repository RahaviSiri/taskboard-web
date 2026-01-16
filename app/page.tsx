'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/task");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-100 to-indigo-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4">
        <p className="text-gray-600 text-lg">Move to Task Page</p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Go to Tasks
        </button>
      </div>
    </div>
  );
}
