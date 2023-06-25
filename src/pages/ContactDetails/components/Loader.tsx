const Loader = () => {
  return (
    <div data-testid="detailLoader" className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-400 dark:bg-slate-700 mb-3"></div>

        <div className="mb-5 flex flex-col justify-center space-y-1.5">
          <div className="h-6 w-24 contactDetailItemLoader"></div>
          <div className="self-center h-6 w-10 contactDetailItemLoader"></div>
        </div>

        <div className="mb-10 space-x-1.5 flex">
          <div className="h-12 w-14 contactDetailItemLoader"></div>
          <div className="h-12 w-14 contactDetailItemLoader"></div>
          <div className="h-12 w-14 contactDetailItemLoader"></div>
          <div className="h-12 w-14 contactDetailItemLoader"></div>
        </div>

        <div className="h-12 w-36 contactDetailItemLoader"></div>
      </div>
    </div>
  );
};

export default Loader;
