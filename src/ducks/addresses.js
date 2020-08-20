const TESTNET = {
    "tokenAddresses": {
        "addresses": [
            [
                "ALICE",
                "0xe7f965e27c18188caf27977a8e10b0bf40f6e523"
            ],
            [
                "BOB",
                "0x61950e81019cadc560036125b262ef0caa705896"
            ]
        ]
    },
    "exchangeAddresses": {
        "addresses": [
            [
                "ALICE",
                "0x4adb64306dedc02e9b574df089636aeee184359e"
            ],
            [
                "BOB",
                "0xc81d850429a4dc581ddd6198022103b5b2d719ee"
            ]
        ],
        "fromToken": {
            "0xe7f965e27c18188caf27977a8e10b0bf40f6e523": "0x4adb64306dedc02e9b574df089636aeee184359e",
            "0x61950e81019cadc560036125b262ef0caa705896": "0xc81d850429a4dc581ddd6198022103b5b2d719ee"
        }
    },
    "factoryAddress": "0xeb2ef6b55f603b858ca30ea9bdeaa0ef37c4625d"
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
