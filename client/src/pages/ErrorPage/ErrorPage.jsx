import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <>
            <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-8xl font-semibold text-gray-50">404</p>
                    <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-50 ">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-50">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 items-center justify-center">
                        <Link
                            to='/'
                            className="rounded-md bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
