import { useParams } from "react-router-dom";


const PaymentSuccess = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
            <h1>Payment Success</h1>
        </div>
    );
};

export default PaymentSuccess;