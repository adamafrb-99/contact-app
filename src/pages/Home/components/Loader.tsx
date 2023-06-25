const Loader = () => {
  return (
    <div data-testid="listLoader" className="animate-pulse space-y-4">
      <div className="space-y-1.5">
        <div className="px-2 py-1 h-7 bg-gray-400 dark:bg-slate-700 rounded-lg"></div>
        <div className="space-y-1">
          <div className="listItemLoader"></div>
          <div className="listItemLoader"></div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="px-2 py-1 h-7 bg-gray-400 dark:bg-slate-700 rounded-lg"></div>
        <div className="space-y-1">
          <div className="listItemLoader"></div>
          <div className="listItemLoader"></div>
          <div className="listItemLoader"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
