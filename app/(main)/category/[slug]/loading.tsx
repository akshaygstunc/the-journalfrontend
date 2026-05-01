export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-[#861212] rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Loading news...</p>
    </div>
  );
}