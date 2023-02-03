import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { setupStore } from './storage/store';
import { Provider } from 'react-redux';
import "./main.scss"

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </StrictMode>,
);
