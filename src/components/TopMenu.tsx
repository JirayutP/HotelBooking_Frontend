import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Link } from '@mui/material'

export default async function TopMenu() {
    const session = await getServerSession(authOptions)
    

    if (!session || !session.user.token){
    return(
            <div className='h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border- border-t border-b border-gray-400 flex'>
                <Link href="/">
                    <Image src={'/img/logo.jpg'} className='h-[100%] w-auto'
                    alt='logo'
                    width={0}
                    height={0}
                    sizes='100vh'/>
                </Link>
                
                <div className='flex flex-row absolute right-0 h-full'>  
                            <Link href='/register'>
                                <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                                    Register
                                </div>
                            </Link>
                            <Link href='/api/auth/signin'>
                                <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                                    Sign-In
                                </div>
                            </Link>
                </div>
            </div>
        )
    }

    const profile = await getUserProfile(session.user.token)

    if(profile.data.role == "admin"){
        return(
            <div className='h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border- border-t border-b border-gray-400 flex'>
                <Link href="/">
                    <Image src={'/img/logo.jpg'} className='h-[100%] w-auto'
                    alt='logo'
                    width={0}
                    height={0}
                    sizes='100vh'/>
                </Link>
                <TopMenuItem title='Manage' pageRef='/booking/manage'/>
                <TopMenuItem title='Select Hotel' pageRef='/hotel'/>
                <TopMenuItem title='All Booking' pageRef='/mybooking'/> 
                
                <div className='flex flex-row absolute right-0 h-full'>  
                        <Link href='/api/auth/signout'>
                            <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                                Sign-Out of {session.user?.name}
                            </div>
                        </Link>
                </div>
            </div>
        )
    }

    return(
        <div className='h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border- border-t border-b border-gray-400 flex'>
            <Link href="/">
                <Image src={'/img/logo.jpg'} className='h-[100%] w-auto'
                alt='logo'
                width={0}
                height={0}
                sizes='100vh'/>
            </Link>
            <TopMenuItem title='Manage' pageRef='/booking/manage'/>
            <TopMenuItem title='Select Hotel' pageRef='/hotel'/>
            <TopMenuItem title='My Booking' pageRef='/mybooking'/> 
            
            <div className='flex flex-row absolute right-0 h-full'> 
                    <Link href='/api/auth/signout'>
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                            Sign-Out of {session.user?.name}
                        </div>
                    </Link>
            </div>
        </div>
    )
}