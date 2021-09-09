import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
    data: Data | null;
    loading: boolean;
    error: string;
    price: USD | null;
}

const initialState: DataState = {
    data: null,
    loading: false,
    error: '',
    price: null,
}

const API_KEY = ''; //please enter your API_KEY


export const fetchDatas = createAsyncThunk("datas/fetchDatas", async() => {
    let qs = `?start=1&convert=USD`
    let response = await axios.get<Data>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
        headers: { 'X-CMC_PRO_API_KEY':  API_KEY },
    });
    return response.data;
})

// export const fetchLogo = createAsyncThunk("datas/fetchLogo", async(id) => {
//     let response = await axios.get<Data>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + id, {
//         headers: { 'X-CMC_PRO_API_KEY':  API_KEY },
//     });
//     return response.data;
// })


const getDatasSlice = createSlice({
    name: 'datas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDatas.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(fetchDatas.fulfilled, (state, action: PayloadAction<Data>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDatas.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error fetching data';
        })
    }
})
export default getDatasSlice.reducer;


export interface Status {
    timestamp: Date;
    error_code: number;
    error_message?: any;
    elapsed: number;
    credit_count: number;
    notice?: any;
    total_count: number;
}

export interface Platform {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
}

export interface USD {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: Date;
}

export interface Quote {
    USD: USD;
}

export interface Datum {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: Date;
    tags: string[];
    max_supply?: number;
    circulating_supply: number;
    total_supply: number;
    platform: Platform;
    cmc_rank: number;
    last_updated: Date;
    quote: Quote;
}

export interface Data {
    status: Status;
    data: Datum[];
}
