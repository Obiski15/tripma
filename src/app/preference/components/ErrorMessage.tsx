function ErrorMessage() {
  return (
    <div className="w-full flex-1 md:min-h-screen flex justify-center items-center">
      <p className="text-center font-semibold">
        Something went wrong!
        <br />
        Unable to process your request. Pls try again
      </p>
    </div>
  );
}

export default ErrorMessage;
