export default async function bookHotel(hid:string,token:string,checkInDate:string,checkOutDate:string, currDate:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hid}/bookings`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "bookingDate": checkInDate,
        "checkoutDate": checkOutDate,
        "createdAt": currDate
      }),
    })
  
    if (!response.ok) {
      throw new Error("Failed to book hotel");
    }
    return await response.json();
  
  }