'use client'
import { Provider as ReactReductProvider } from "react-redux"
import { store } from "./store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

export default function ReduxProvider({children}:{children:React.ReactNode}){
    let persistor = persistStore(store)

    return (
        <ReactReductProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </ReactReductProvider>
    )
}