import { ClientNavButtons } from "../common/components/ClientNavButtons";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404!</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Oops! Missed the shot?
      </h2>
      <p className="text-gray-600 mb-6">
        We missed the mark this time, but your perfect sports gear is still
        within reach!
      </p>
      <ClientNavButtons />
    </div>
  );
}
