import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    orderItems: [],
    listCheckedStore: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find(item => item?.product === orderItem?.product);
            if (itemOrder)
                itemOrder.amount += orderItem.amount; // RTK dùng Immer để cập nhật trực tiếp state
            else
                state.orderItems.push(orderItem);
        },
        increaseAmount: (state, action) => {
            const { prodId } = action.payload;
            const itemOrder = state.orderItems.find(item => item.product === prodId);
            if (itemOrder)
                itemOrder.amount++;
        },
        decreaseAmount: (state, action) => {
            const { prodId } = action.payload;
            const itemOrder = state.orderItems.find(item => item.product === prodId);
            if (itemOrder) {
                itemOrder.amount--;
                if (itemOrder.amount <= 0) {
                    state.orderItems = state.orderItems.filter(item => item.product !== prodId);
                }
            }
        },
        removeOrderProduct: (state, action) => {
            const { prodId } = action.payload;
            state.orderItems = state.orderItems.filter(item => item.product !== prodId);
        },
        saveListChecked: (state, action) => {
            state.listCheckedStore = action.payload.listChecked;
        },
        resetOrderCarts: (state, action) => {
            state.orderItems = state.orderItems.filter(orderItem =>
                !state.listCheckedStore.includes(orderItem.product)
            );
            state.listCheckedStore = [];
        }

    },
    extraReducers: (builder) => {


    },

})

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, saveListChecked,
    resetOrderCarts } = orderSlice.actions
export default orderSlice.reducer