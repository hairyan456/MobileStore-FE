import { useMemo } from 'react';

const useOrderCalculations = (orderItems = [], listChecked = [], feeShip = 0, selectedItemsInput = []) => {

    // hàm lấy các orderItems có id trong listChecked:
    const selectedItems = useMemo(() => {
        if (!orderItems || listChecked.length === 0) return [];
        return orderItems.filter(item => listChecked.includes(item.product));
    }, [orderItems, listChecked]);

    // hàm Tạm Tính
    const calculateSubtotal = (products) => {
        return products.reduce((subtotal, product) => {
            return subtotal + (product.price * product.amount);
        }, 0);
    };
    const subtotal = useMemo(() => calculateSubtotal(selectedItems), [selectedItems]);

    // hàm tính tiền giảm giá
    const calculateDiscount = (products) => {
        if (!products || products.length === 0) return 0;

        return products.reduce((discountTotal, product) => {
            const discountAmount = product.price * product.amount * (product.discount);
            return discountTotal + discountAmount;
        }, 0); // Giá trị khởi tạo của discountTotal là 0
    };
    const discountTotal = useMemo(() => calculateDiscount((selectedItemsInput.length > 0) ? selectedItemsInput : selectedItems)
        , [selectedItems])

    // hàm tính tiền thuế 8%
    const calculateTax = (subtotal, discount, vatRate = 8) => {
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * (vatRate / 100);
        return tax;
    };
    const tax = useMemo(() => calculateTax(subtotal, discountTotal), [subtotal, discountTotal]);

    // hàm tính tiền tổng
    const calculateTotal = (subTotal, discountTotal, tax) => {
        if (listChecked.length <= 0 || orderItems.length <= 0) return 0;
        const total = subTotal - discountTotal + tax + feeShip;
        return total;
    };
    const total = useMemo(() => calculateTotal(subtotal, discountTotal, tax), [subtotal, discountTotal, tax, feeShip]);

    return { subtotal, discountTotal, tax, total, selectedItems };
};

export default useOrderCalculations;
