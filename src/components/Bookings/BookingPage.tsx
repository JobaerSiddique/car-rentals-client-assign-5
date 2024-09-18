import { useState } from "react";
import LoadingPage from "../../pages/shared/LoadingPage";
import { useGetCarsQuery } from "../../redux/features/Cars/CarApi";
import SearchBooking from "./SearchBooking";
import PageBanner from "../../pages/shared/pageBanner";
import booking from '../../image/booking.jpg';
import SearchResultBooking from "./SearchResultBooking";
import { toast } from "sonner";

const BookingPage = () => {
    const [searchCriteria, setSearchCriteria] = useState();
    const { data: cars, isLoading, error } = useGetCarsQuery(searchCriteria, {
        skip: !searchCriteria,
    });

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        let errorMessage = "An unknown error occurred";

        if (typeof error === 'object' && error !== null) {
            if ('data' in error && typeof (error as any).data === 'object' && (error as any).data !== null) {
                // Handle FetchBaseQueryError
                errorMessage = (error as any).data?.message || errorMessage;
            } else if ('message' in error) {
                // Handle standard Error object
                errorMessage = (error as { message?: string }).message || errorMessage;
            }
        }

        toast(errorMessage, {
            position: 'top-center'
        });
    }

    const handleSearch = (criteria: any) => {
        setSearchCriteria(criteria); // Update the search criteria
    };

    return (
        <div>
            <PageBanner image={booking} text={"Welcome to Booking Page"} />
            <SearchBooking onSearch={handleSearch} />
            {cars && <SearchResultBooking cars={cars} />}
        </div>
    );
};

export default BookingPage;

