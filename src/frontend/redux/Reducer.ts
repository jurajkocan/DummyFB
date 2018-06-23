import { ReduxState, defaultAppState } from "./State";

export const reducer = (state: ReduxState = defaultAppState, action: any): ReduxState => {
    switch (action) {
        default:
            return state;
    }
}
