import Link from 'next/link'

export default function BackButton(){
    return (
        <div className="w-11/12">
            <Link href="../"className="fixed top-1 right-2 sm:top-7 sm:right-6 px-3 py-2 sm:px-6 sm:py-3 m-4 border border-gray-200 rounded-md font-bold hover:bg-green-50 hover:duration-100 duration-700 hover:scale-105">
                Back
            </Link>
        </div>
    );
}