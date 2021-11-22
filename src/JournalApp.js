import { AppRouter } from "./routers/AppRouter"
import { Provider } from 'react-redux'
import { store } from './store/store';
import 'animate.css';

export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
