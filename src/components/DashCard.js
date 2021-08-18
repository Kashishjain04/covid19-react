const DashCard = ({ title, color, delta, total }) => {
  return (
    <div className="grid grid-rows-3 m-3 sm:m-5 py-4 place-items-center font-semibold rounded-lg  border">
      <p className="uppercase text-sm" style={{ color: `rgb(${color})` }}>
        {title}
      </p>
      <div
        className="text-xs flex items-center "
        style={{ color: `rgba(${color},0.5)` }}
      >
        {delta !== "" &&
          (delta ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        <p>{delta}</p>
      </div>
      <p className="text-lg">{total}</p>
    </div>
  );
};

export default DashCard;
