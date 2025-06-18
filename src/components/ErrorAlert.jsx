function ErrorAlert({ message }) {

  // This component displays an error message in a styled alert box.
  // If no message is provided, it returns null (no alert).
  if (!message) return null;

  return (
    <div className="alert alert-danger text-center w-50 mx-auto mt-5">
      {message}
    </div>
  );
}

export default ErrorAlert;