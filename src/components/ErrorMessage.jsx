const ErrorMessage = ({ message }) => (
  <div className="mt-3 text-red-300 text-sm font-medium bg-red-500/10 px-4 py-2 rounded-lg border border-red-400/40 backdrop-blur-sm animate-pulse">
    {message}
  </div>
);

export default ErrorMessage;
