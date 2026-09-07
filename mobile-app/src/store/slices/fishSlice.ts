import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/api/axios';


interface Fish {
    _id: string;
    name: string;
    category: string;
    pricePerKg: number;
    availableQuantity: number;
    unit: string;
    isAvailable: boolean;
}

interface FishState {
    items: Fish[];
    loading: boolean;
    error: string | null;
}

const initialState: FishState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchFish = createAsyncThunk(
    'fish/fetchFish',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/fish');

            console.log('FISH API RESPONSE:', response.data);

            return response.data.data;
        } catch (error: any) {
            console.log('FISH API ERROR:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch fish'
            );
        }
    }
);

const fishSlice = createSlice({
    name: 'fish',
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFish.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchFish.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchFish.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default fishSlice.reducer;