import { useMemo } from 'react';

const userOrderHistory = ({ ...props }) => {

    // hàm Phương thức giao hàng:
    const getDeliveryMethod = (shippingPrice) => {
        return (shippingPrice === 15) ? 'Giao hàng tiết kiệm' : 'Giao hàng hỏa tốc'
    };
    const deliveryMethod = useMemo(() => getDeliveryMethod(props.shippingPrice), [props.shippingPrice]);

    // hàm Phương thức thanh toán:
    const getPaymentMethod = (paymentMethod) => {
        return (paymentMethod === 'mobile_banking') ? 'Thanh toán qua ví điện tử' : 'Thanh toán tiền mặt khi nhận hàng'
    };
    const paymentMethod = useMemo(() => getPaymentMethod(props.paymentMethod), [props.paymentMethod]);

    // hàm Họ tên:
    const getFullname = (fullName) => {
        return fullName;
    };
    const fullName = useMemo(() => getFullname(props.fullName), [props.fullName]);

    // hàm Phone:
    const getPhone = (phone) => {
        return phone;
    };
    const phone = useMemo(() => getPhone(props.phone), [props.phone]);

    // hàm Address:
    const getAddress = (address) => {
        return address;
    };
    const address = useMemo(() => getAddress(props.address), [props.address]);

    // hàm City:
    const getCity = (city) => {
        return city;
    };
    const city = useMemo(() => getCity(props.city), [props.city]);

    // hàm ShippingPrice:
    const getShippingPrice = (shippingPrice) => {
        return shippingPrice;
    };
    const shippingPrice = useMemo(() => getShippingPrice(props.shippingPrice), [props.shippingPrice]);

    // hàm itemsPrice:
    const getItemsPrice = (itemsPrice) => {
        return itemsPrice;
    };
    const itemsPrice = useMemo(() => getItemsPrice(props.itemsPrice), [props.itemsPrice]);

    // hàm total:
    const getTotal = (totalPrice) => {
        return totalPrice;
    };
    const totalPrice = useMemo(() => getTotal(props.totalPrice), [props.totalPrice]);


    return { deliveryMethod, paymentMethod, fullName, phone, address, city, shippingPrice, itemsPrice, totalPrice };
};

export default userOrderHistory;
