import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';

const backend = import.meta.env.VITE_BACKEND_URL

const OrderConfirmation = () => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { clearCart } = useContext(CartContext)
    const { id } = useParams()

    const fetchPaymentStatus = async () => {
        try {
            const response = await axios.post(`${backend}/api/v1/orders/verify-order`, { transactionId: id });
            if (response.status === 200) {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('failed');
            }
            clearCart()
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching payment status:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentStatus();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3a37]"></div>
                    <p className="mt-4 text-gray-600 font-marcellus">Processing payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            {isLoading ? (
                <div className="text-center animate-fade-in">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1a3a37]"></div>
                    <p className="mt-4 text-gray-600 font-marcellus">Processing your payment...</p>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 animate-pop-in">
                    {paymentStatus === 'success' ? (
                        <SuccessCard />
                    ) : (
                        <FailureCard />
                    )}
                </div>
            )}
        </div>
    );
};


const SuccessCard = () => (
    <div className="text-center space-y-6" aria-live="polite">
        <div className="animate-bounce-in">
            <svg
                className="mx-auto h-20 w-20 text-[#1a3a37] animate-checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <h2 className="text-3xl font-marcellus text-gray-900">
            Payment Successful! 🎉
        </h2>
        <div className="space-y-2">
            <p className="text-gray-600">
                Your order has been confirmed
            </p>
        </div>
        <Link
            to="/view-profile"
            className="inline-block w-full bg-[#1a3a37] text-white py-3 px-6 rounded-lg
                 hover:bg-[#122925] transform hover:scale-[1.02] transition-all
                 duration-200 font-marcellus shadow-md"
        >
            View Order Details
        </Link>
    </div>
);

const FailureCard = () => (
    <div className="text-center space-y-6" aria-live="polite">
        <div className="animate-shake">
            <svg
                className="mx-auto h-20 w-20 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <h2 className="text-3xl font-marcellus text-gray-900">
            Payment Failed 😟
        </h2>
        <div className="space-y-2">
            <p className="text-gray-600">
                We encountered an issue processing your payment
            </p>
            <p className="text-sm text-gray-500">
                Please check your payment details and try again
            </p>
        </div>
        <div className="space-y-4">
            <Link
                to="/my-cart"
                className="inline-block w-full bg-red-600 text-white py-3 px-6 rounded-lg
                   hover:bg-red-700 transform hover:scale-[1.02] transition-all
                   duration-200 font-marcellus shadow-md"
            >
                Retry Payment
            </Link>
        </div>
    </div>
);


export default OrderConfirmation;