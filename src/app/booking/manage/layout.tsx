export default function ManageReservationlayout( {accountInfo, addHotel}: {accountInfo:React.ReactNode, addHotel:React.ReactNode}) {
    return(
        <div className="flex flex-col w-full">
            <div className="text-center text-lg mt-10">Your Account Information</div>
            {accountInfo}
            {addHotel}
        </div>
    );
}