export default function Loading() {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full">

        </div>
      </div>
    </>
  );
}
