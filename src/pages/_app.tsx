import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/main.scss';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';


function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default App;
