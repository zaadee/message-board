import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app";
import { BoardContainer } from "./containers";
import { configurePushMessages } from "./features";
let persistor = persistStore(store);
configurePushMessages(store.dispatch);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BoardContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
