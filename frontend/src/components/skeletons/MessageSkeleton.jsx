const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg animate-pulse ${
              i % 2 === 0 ? "bg-base-300" : "bg-primary"
            }`}
          >
            <div className="w-32 h-4 rounded bg-base-200/50"></div>
            <div className="w-16 h-3 mt-2 rounded bg-base-200/50"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
