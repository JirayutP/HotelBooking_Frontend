"use client"
import updateHotel from "@/libs/updateHotel"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function EditHotelPage() {
  const router = useRouter();

  const urlParams = useSearchParams()
  const hotelData = JSON.parse(urlParams.get('hotelData') || "{}")
  const token = urlParams.get('token') || ""

  function generateDirectDownloadLink(viewUrl: string) {
    if (viewUrl.match(/https:\/\/drive\.google\.com\/uc\?export=download&id=.*$/)) {
      return viewUrl; // URL is already in the desired format
    }
    const match = viewUrl.match(/https:\/\/drive\.google\.com\/file\/d\/(.*?)\/view\?usp=.*$/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else {
      return null; // Invalid URL format
    }
  }

  async function toupdateHotel(addHotelForm:FormData) {
    const name = addHotelForm.get("name")?.toString() || ""
    const address = addHotelForm.get("address")?.toString() || ""
    const district = addHotelForm.get("district")?.toString() || ""
    const province = addHotelForm.get("province")?.toString() || ""
    const postalcode = addHotelForm.get("postalcode")?.toString() || ""
    const tel = addHotelForm.get("tel")?.toString() || ""
    const ggDriveURL = addHotelForm.get('picture')?.toString() || ""
    const picture = generateDirectDownloadLink(ggDriveURL.toString()) || ""

    const HotelInfo = [name,address,district,province,postalcode,tel,picture]

    const response = await updateHotel(hotelData._id,HotelInfo,token);
        if (response.success) {
            router.push('/hotel')
            router.refresh();
            alert(`Update hotel: ${addHotelForm.get("name")} success`);
        }
  }

  return(
    <main className="bg-slate-100 m-5 p-5">
        <div className="text-center text-xl">Editing Hotel ID: {hotelData._id}</div>
        <form action={toupdateHotel}>
            <div className="text-xl text-blue-700">Update Hotel</div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor='name'>Name</label>
                <input type='text' required id='name' name='name' placeholder="Hotel Name" maxLength={50}
                    className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.name}
                    />
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor='address'>Address</label>
                <input type='text' required id='address' name='address' placeholder="Hotel Address"
                    className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.address}/>
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor='district'>District</label>
                <input type='text' required id='district' name='district' placeholder="District"
                    className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.district}/>
                <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor='province'>Province</label>
                <input type='text' required id='province' name='province' placeholder="Province"
                    className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.province}/>
                <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor='postalcode'>Postalcode</label>
                <input type='text' required id='postalcode' name='postalcode' placeholder="Postalcode" maxLength={5}
                    className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.postalcode}/>
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor='tel'>Tel</label>
                <input type='text' required id='tel' name='tel' placeholder="Tel"
                    className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.tel}/>
            </div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor='picture'>Picture</label>
                <input type='text' required id='picture' name='picture' placeholder="URL public share link from Google Drive (Don't change anything.)"
                    pattern="https:\\/\\/drive\\.google\\.com\\/(?:file\\/d\\/[^\\/]+\\/view\\?usp=.*|uc\\?export=download&id=.*)"
                    title='Must be in the format "https://drive.google.com/file/d/...id.../view?usp=drive_link" or "https://drive.google.com/uc?export=download&id=...id..."'
                    className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    defaultValue={hotelData.picture}
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Update This Hotel</button>
        </form>
    </main>

  )

}