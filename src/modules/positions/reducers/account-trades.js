import { UPDATE_ACCOUNT_TRADES_DATA } from '../../positions/actions/update-account-trades-data';

export default function(accountTrades = {}, action) {
    switch (action.type) {
        case UPDATE_ACCOUNT_TRADES_DATA:
            return {
                ...accountTrades,
                ...action.data
            };

        default:
            return accountTrades;
    }
}