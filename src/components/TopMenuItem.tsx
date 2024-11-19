import Link from 'next/link'

export default function TopMenuItem( {title, pageRef}: {title:string, pageRef:string}) {
    return(
        <Link href={pageRef} className='w-[120px] text-center mt-auto mb-auto font-sans text-base text-gray-500 hover:text-sky-500'>
            {title}
        </Link>
    );
}