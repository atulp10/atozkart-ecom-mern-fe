import axios from "axios";
import { toast } from "react-toastify";

// export const getProductsData = async () => {
//     try {
//         let res = await fetch('https://dummyjson.com/products');
//         let data = await res.json();
//         return data.products;
//     }
//     catch (err) { console.log(err); }
// }

export const getLocalProducts = async () => {
    try {
        let res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/products`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }

        let data;
        try {
            data = await res.json();
        } catch (jsonErr) {
            throw new Error("Invalid server response");
        }

        if (!data) throw new Error("No data received from server");

        return data;
    }
    catch (err) {
        console.log('Error fetching products: ', err);
        throw err;
    }
}

export const placeOrder = async (orderDetails) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_NODE_SERVER}/orders`, orderDetails, { withCredentials: true });
        return res.data;
    }
    catch (err) {
        const errMsg = err.response?.data?.message || err.message || 'Something went wrong';
        console.log('Error placing order: ', errMsg);
        throw err;
    }
}

export const sendEmail = async (mailData) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_NODE_SERVER}/sendemail`, mailData, { withCredentials: true });
        return res.data;
    }
    catch (err) {
        const errMsg = err.response?.data?.message || err.message || 'Something went wrong';
        console.log('Error sending email: ', errMsg);
        throw err;
    }
}

export const getMyOrders = async (url) => {
    try {
        let res = await axios.get(url, { withCredentials: true });
        if(!res.data) throw new Error("No data received from server");  
        return res.data;
    }
    catch (err) {
        const errMsg = err.response?.data?.message || err.message || 'Something went wrong';
        console.log('Error getting my orders: ', errMsg);
        throw err;
    }
}

export const updateProductStock = async (items) => {
    try {
        const updatePromises = items.map(async (item) => {
            const { _id, qty } = item;

            const res = await fetch(`${import.meta.env.VITE_NODE_SERVER}/products/${_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...item,
                    stock: (item.stock ?? 0) - qty, // Ensure stock is valid
                    updatedAt: new Date(),
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error(`Failed to update stock for product ${_id} - ${res.status} ${res.statusText}`);
            }

            return res.json();
        });

        const results = await Promise.all(updatePromises); // Run all fetches in parallel
        return results;

    } catch (err) {
        console.error(err.message);
        throw err;
    }
};
