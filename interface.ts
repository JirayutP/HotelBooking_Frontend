export interface LocalBookingItem{
    bookingDate: string,
    checkoutDate: string,
    user: string,
    hotel: string,
    createdAt: string,
}

export interface BookingItem{
    _id: string,
    bookingDate: string,
    checkoutDate: string,
    user: string,
    hotel: string,
    createdAt: string,
    __v: number
}

export interface BookingJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: BookingItem[]
}

export interface HotelItem{
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number
}

export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
}

export interface UserItem{
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    password: string,
    createdAt: string,
    __v: number
}

export interface UserJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: UserItem[]
}