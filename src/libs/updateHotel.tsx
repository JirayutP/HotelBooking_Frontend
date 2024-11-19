export default async function updateHotel(hid:string,HotelInfo:string[],token:string) {

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hid}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": HotelInfo[0],
      "address": HotelInfo[1],
      "district": HotelInfo[2],
      "province": HotelInfo[3],
      "postalcode": HotelInfo[4],
      "tel": HotelInfo[5],
      "picture": HotelInfo[6]
    }),
  })

  if (!response.ok) {
    alert("Failed to edit hotel");
    // throw new Error("Failed to edit hotel");
  }
  return await response.json();

}