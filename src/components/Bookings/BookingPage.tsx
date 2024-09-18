import { useState } from "react";
import LoadingPage from "../../pages/shared/LoadingPage";
import { useGetCarsQuery } from "../../redux/features/Cars/CarApi";
import SearchBooking from "./SearchBooking";
import PageBanner from "../../pages/shared/pageBanner";
import booking from '../../image/booking.jpg'
import SearchResultBooking from "./SearchResultBooking";
import { toast } from "sonner";

const BookingPage = () => {
    const [searchCriteria, setSearchCriteria] = useState();
    const { data: cars,isLoading,error } = useGetCarsQuery(searchCriteria, {
        skip: !searchCriteria, 
      });
console.log({cars});

if(isLoading) {
    return <LoadingPage />
}
if(error){
   toast(error?.data?.message,{
        position: 'top-center'
   })
}

const handleSearch = (criteria:any) => {
    setSearchCriteria(criteria); // Update the search criteria
  };




    return (
        <div>
            <PageBanner image={booking} text={"Welcome to Booking Page"}/>
            <SearchBooking  onSearch={handleSearch}/>
            {cars && <SearchResultBooking cars={cars}/>}
        </div>
    );
};

export default BookingPage;