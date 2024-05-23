import { API } from '@/Services/base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import {
	homeReducers,
	themeReducers,
	onboardReducers,
	registerReducers,
	authReducer,
	farmReducers,
} from './reducers'
import { farmerApi } from '@/Services/farmers'
import reactotron from '../../ReactotronConfig'
import { NativeModules } from 'react-native'

// if (__DEV__) {
// 	console.log('Setting isDebuggingRemotely to true')
// 	NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

const reducers = combineReducers({
	theme: themeReducers,
	home: homeReducers,
	onboard: onboardReducers,
	register: registerReducers,
	auth: authReducer,
	farm: farmReducers,
	[farmerApi.reducerPath]: farmerApi.reducer,
})

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['theme', 'onboard', 'register', 'auth'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

// const store = configureStore({
// 	reducer: persistedReducer,
// 	// enhancers: (getDefaultEnhancers) =>
// 	// 	__DEV__ ? getDefaultEnhancers().concat(reactotron.createEnhancer!()) : getDefaultEnhancers(),
// 	middleware: (getDefaultMiddleware) => {
// 		const middlewares = getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 			},
// 		}).concat(API.middleware)
// 		return middlewares
// 	},
// })
const store = configureStore({
	reducer: persistedReducer,
	enhancers: (getDefaultEnhancers) =>
		__DEV__ ? getDefaultEnhancers().concat(reactotron.createEnhancer!()) : getDefaultEnhancers(),
	middleware: (getDefaultMiddleware) => {
		// Default middleware with custom serializableCheck settings
		const defaultMiddleware = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})

		return [...defaultMiddleware, API.middleware] as Tuple<any>;
	},
})


const persistor = persistStore(store)
setupListeners(store.dispatch)
export { store, persistor }
