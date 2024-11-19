import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Hotel from "@/db/model/Hotel"
import { dbConnect } from '@/db/dbConnect'
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function AccountInfoPage(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return(
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl text-sky-600">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>    
                <tr><td>Member Sine</td><td>{createdAt.toString()}</td></tr>        
            </tbody></table>
        </main>
    )
}