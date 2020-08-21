Edit the [package.json file](https://github.com/tpmccallum/uniswap-frontend/blob/master/package.json#L42) to reflect the name of the blockchain and also the networkId
```
"start:testnet": "REACT_APP_NETWORK_ID=42261 REACT_APP_NETWORK='Oasis Test Network' react-scripts start",
```
Once you have a target i.e. `testnet` with the correct `REACT_APP_NETWORK_ID` and `REACT_APP_NETWORK` you can start using the following command
```
npm install
yarn start:testnet --loglevel verbose
```

If issues then remove package-lock.json and 
```
npm install -s bignumber.js
npm install node-sass
npm install react-scripts
```
