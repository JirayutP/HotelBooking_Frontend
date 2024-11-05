import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Hotel from "@/db/model/Hotel"
import { dbConnect } from '@/db/dbConnect'
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DashboardPage(){
    const addHotel = async (addHotelForm:FormData) => {
        "use server"
        const name = addHotelForm.get('name')
        const address = addHotelForm.get('address')
        const district = addHotelForm.get('district')
        const province = addHotelForm.get('province')
        const postalcode = addHotelForm.get('postalcode')
        const tel = addHotelForm.get('tel')
        const picture = addHotelForm.get('picture')

        try{
            await dbConnect()
            const hotel = await Hotel.create({
                'name': name,
                'address': address,
                'district': district,
                'province': province,
                'postalcode': postalcode,
                'tel': tel,
                'picture': picture,
            })
        }catch(error){
            console.log(error)
        }

        revalidateTag('hotels')
        redirect('/hotel')
    }

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return(
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>    
                <tr><td>Member Sine</td><td>{createdAt.toString()}</td></tr>        
            </tbody></table>
            {
                (profile.data.role=='admin')?
                    <form action={addHotel}>
                        <div className="text-xl text-blue-700">Create Hospital</div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor='name'>Name</label>
                            <input type='text' required id='name' name='name' placeholder="Hotel Name" maxLength={50}
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor='address'>Address</label>
                            <input type='text' required id='address' name='address' placeholder="Hotel Address"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor='district'>District</label>
                            <input type='text' required id='district' name='district' placeholder="District"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                            <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor='province'>Province</label>
                            <input type='text' required id='province' name='province' placeholder="Province"
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                            <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor='postalcode'>Postalcode</label>
                            <input type='text' required id='postalcode' name='postalcode' placeholder="Postalcode" maxLength={50}
                                className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor='tel'>Tel</label>
                            <input type='text' required id='tel' name='tel' placeholder="Tel"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor='picture'>Picture</label>
                            <input type='text' required id='picture' name='picture' placeholder="URL"
                                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Hotel</button>
                    </form>
                : null
            }
        </main>
    )
}