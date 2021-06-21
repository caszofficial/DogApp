const initialState = {
    breeds: [],
    filter: [],
    breedsDetail: {},
    temps: [],
  


}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_BREEDS_RACE':
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_ID':
            return {
                ...state,
                breedsDetail: action.payload
            }
        case 'order_ZA':
            return {
                ...state,
                breeds: action.payload
            }
        case 'order_AZ':
            return {
                ...state,
                breeds: action.payload
            }
        case 'ORDER_LIGHT':
            return {
                ...state,
                breeds: action.payload
            }
        case 'ORDER_HEAVY':
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_TEMP':
            return {
                ...state,
                temps: action.payload
            }
        case 'CREATE_BREED':
            return {
                ...state,
                breeds: state.breeds.concat(action.payload)
            }
        case 'FILTER':
            return {
                ...state,
                filter: action.payload
            }

        case 'DB': 
            return {
                ...state,
                filter: state.breeds.filter(b => b.id.length > 6).sort()
            }
        case 'API': 
            return {
                ...state,
                filter: state.breeds.filter(b => b.id < 500).sort()
            }
        case 'ALL': 
            return {
                ...state,
                filter: state.breeds
            }
        default:
            return {
                state
            }
    }
}

export default reducer