import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getAllProductTypes, getProductsByCondition } from '../../services/productService';

const initialState = {
    totalProducts: 0,
    listProducts: [],
    limit: 6,
    isLoading: false,
    productTypes: [],
    searchProduct: ''
}

export const fetchProductsByCondition = createAsyncThunk('product/fetchProductsByCondition', async ({ page, limit, sort, filter, field }) => {
    try {
        const res = await getProductsByCondition(page, limit, sort, filter, field);
        return res?.DT; // payload
    } catch (error) {
        throw error;
    }
});

export const fetchAllProductTypes = createAsyncThunk('product/fetchAllProductTypes', async ({ }) => {
    try {
        const res = await getAllProductTypes();
        return res?.DT; // payload
    } catch (error) {
        throw error;
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateListProducts: (state, action) => {
            state.listProducts = action?.payload ?? [];
        },
        updateLimit: (state, action) => {
            state.limit = state.limit + (+action?.payload || 0);
        },
        updateSearchProduct: (state, action) => {
            state.searchProduct = action?.payload || '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCondition.pending, (state, action) => {
                state.isLoading = true;
                // console.log('Pending:', action.meta);
            })
            .addCase(fetchProductsByCondition.fulfilled, (state, action) => {
                // console.log('FULLFILLED')
                state.isLoading = false
                state.listProducts = action?.payload?.listProducts ?? [];
                state.totalProducts = action?.payload?.totalRows ?? 0;
            })
            .addCase(fetchProductsByCondition.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.error.message)
                console.error('Error:', action.error);
            })

            .addCase(fetchAllProductTypes.pending, (state, action) => {
                state.isLoading = true;
                // console.log('Pending:', action.meta);
            })
            .addCase(fetchAllProductTypes.fulfilled, (state, action) => {
                // console.log('FULLFILLED')
                state.isLoading = false
                state.productTypes = action?.payload ?? [];
            })
            .addCase(fetchAllProductTypes.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.error.message)
                console.error('Error:', action.error);
            })


    },

})

export const { updateListProducts, updateLimit, updateSearchProduct } = productSlice.actions
export default productSlice.reducer