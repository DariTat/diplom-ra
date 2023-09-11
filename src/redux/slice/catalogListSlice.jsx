import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemCatalog: [],
    loadingCatalog: true,
    errorCatalog: null,
    categorieActive: 0,
    itemLength: null,
    offset: 0,
    search: '',
    item: null,
    id: null,
}

export const catalogListSlice = createSlice({
    name: 'catalogList',
    initialState,
    reducers: {
        catalogListRequest: (state) => {
            state.loadingCatalog = true;
            state.errorCatalog = false;
        },
        catalogListFailure: (state, action) => {
            state.loadingCatalog = false;
            state.errorCatalog = action.payload;
        },
        catalogListSuccess: (state, action) => {
            state.itemCatalog = [...state.itemCatalog.concat(action.payload)];
            state.loadingCatalog = false;
            state.errorCatalog = null;
            state.itemLength = action.payload.length;
        },
        catalogListReset: (state) => {
            state.itemCatalog = [];
            state.loadingCatalog = false;
            state.errorCatalog = null;
        },
        getMore: (state, action) => {
            state.loadingCatalog = true;
            const { payload, offset } = action.payload;
            state.categorieActive = payload; 
            state.offset = offset;
        },
        searchItemsCatalog: (state, action) => {
            console.log(action)
            const { payload, categorieActive  } = action.payload;
            console.log( payload, categorieActive )
            state.itemCatalog = [];
            state.search = payload;
            state.categorieActive = categorieActive
        },
        searchItem: (state, action) => {
            state.id = action.payload;
            state.loadingCatalog = true;
            state.errorCatalog = false;
        },
        searchSuccess: (state, action) => {
            state.item = action.payload;
            state.loadingCatalog = false;
            state.errorCatalog = null;
        }
    }
})

export const { catalogListRequest, catalogListFailure, catalogListSuccess, catalogListReset, getMore, searchItemsCatalog, searchItem, searchSuccess } = catalogListSlice.actions;

export default catalogListSlice.reducer;