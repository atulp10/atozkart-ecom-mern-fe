import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error?.message || 'Unable to load this page';

  return <main className="p-10 text-center">
    <h1 className="text-2xl font-bold">Something went wrong</h1>
    <p className="mt-2 text-gray-600">{message}</p>
    <Link to="/" className="inline-block mt-5 text-indigo-600 underline">Return home</Link>
  </main>;
}
