const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const WEB_SOCKET = 'ws://localhost:9944';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const connectSubstrate = async () => {
  const wsProvider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({ provider: wsProvider, types: {} });
  return api;
};

const main = async () => {
  const api = await connectSubstrate();
  console.log('Connected to Substrate');
  await api.query.templateModule.something((res) => {
    console.log('subscribe something store value change:', res.toHuman());
  })
  await sleep(30 * 1000);
};

main()
  .then(() => {
    console.log("successfully exited");
    process.exit(0);
  })
  .catch(err => {
    console.log('error occur:', err);
    process.exit(1);
  })