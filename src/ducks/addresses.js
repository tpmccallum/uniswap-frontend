const TESTNET = {
    "tokenAddresses": {
        "addresses": [
            [
                "ALICE",
                "0x1BbE5edc5Caabf4517e40b766D64c3DEd86822Df"
            ],
            [
                "BOB",
                "0x987652e1C2B3B953354A43171063499DCE16dC8f"
            ]
        ]
    },
    "exchangeAddresses": {
        "addresses": [
            [
                "ALICE",
                "0xfeee61cf17129133e9dcd8eb681f7cde50ce830b"
            ],
            [
                "BOB",
                "0xbee82878bc6f7c8576e335cde098cb503fe35fbf"
            ]
        ],
        "fromToken": {
            "0x1BbE5edc5Caabf4517e40b766D64c3DEd86822Df": "0xfeee61cf17129133e9dcd8eb681f7cde50ce830b",
            "0x987652e1C2B3B953354A43171063499DCE16dC8f": "0xbee82878bc6f7c8576e335cde098cb503fe35fbf"
        }
    },
    "factoryAddress": "0x984718904f853a004f145d133deab0c1de50466b"
};

const MAIN = {
  "tokenAddresses": {
    "addresses": []
  },
  "exchangeAddresses": {
    "addresses": [],
    "fromToken": {}
  },
  "factoryAddress": ""
};

const SET_ADDRESSES = 'app/addresses/setAddresses';
const ADD_EXCHANGE = 'app/addresses/addExchange';

const initialState = TESTNET;

export const addExchange = ({label, exchangeAddress, tokenAddress}) => (dispatch, getState) => {
  const { addresses: { tokenAddresses, exchangeAddresses } } = getState();

  if (tokenAddresses.addresses.filter(([ symbol ]) => symbol === label).length) {
    return;
  }

  if (exchangeAddresses.fromToken[tokenAddresses]) {
    return;
  }

  dispatch({
    type: ADD_EXCHANGE,
      payload: {
      label,
        exchangeAddress,
        tokenAddress,
    },
  });
};

 export const setAddresses = networkId => {
  switch(networkId) {
    // CyberMiles Main Net
    case 18:
    case '18':
      return {
        type: SET_ADDRESSES,
        payload: MAIN,
      };
    // CyberMiles Test Net
    case 1:
    case '1':
    default:
      return {
        type: SET_ADDRESSES,
        payload: TESTNET,
      };
  }
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ADDRESSES:
      return payload;
    case ADD_EXCHANGE:
      return handleAddExchange(state, { payload });
    default:
      return state;
  }
}

function handleAddExchange(state, { payload }) {
  const { label, tokenAddress, exchangeAddress } = payload;

  if (!label || !tokenAddress || !exchangeAddress) {
    return state;
  }

  return {
    ...state,
    exchangeAddresses: {
      ...state.exchangeAddresses,
      addresses: [
        ...state.exchangeAddresses.addresses,
        [label, exchangeAddress]
      ],
      fromToken: {
        ...state.exchangeAddresses.fromToken,
        [tokenAddress]: exchangeAddress,
      },
    },
    tokenAddresses: {
      ...state.tokenAddresses,
      addresses: [
        ...state.tokenAddresses.addresses,
        [label, tokenAddress]
      ],
    },
  };
}
