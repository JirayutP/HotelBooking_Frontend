export interface BookingItem{
    bookingDate: string,
    checkoutDate: string,
    user: string,
    hotel: string,
    createdAt: string
}

export interface HotelItem{
    _id: string,
    name: string,
    address: string,
    district: number,
    province: string,
    postalcode: string,
    tel: number,
    picture: string,
    __v: number
}

export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }