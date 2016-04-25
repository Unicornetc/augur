import { MakeDescriptionFromCategoricalOutcomeNames } from '../../../utils/parse-market-data';

import { BRANCH_ID } from '../../app/constants/network';
import { BINARY, CATEGORICAL, SCALAR, COMBINATORIAL } from '../../markets/constants/market-types';
import { MAKE_MARKET } from '../../transactions/constants/types';
import { PENDING, SUCCESS, FAILED, CREATING_MARKET } from '../../transactions/constants/statuses';

import AugurJS from '../../../services/augurjs';

import { loadMarket } from '../../markets/actions/load-market';
import { addTransactions } from '../../transactions/actions/add-transactions';
import { updateTransactions } from '../../transactions/actions/update-transactions';
import { clearMakeInProgress } from '../../create-market/actions/update-make-in-progress';

import { selectNewTransaction } from '../../transactions/selectors/transactions';

export function submitNewMarket(newMarket) {
	return function(dispatch, getState) {
		var { links } = require('../../../selectors');
		links.transactionsLink.onClick();
		dispatch(addTransactions([selectNewTransaction(
			MAKE_MARKET,
			0,
			0,
			0,
			0,
			newMarket,
			(transactionID) => dispatch(createMarket(transactionID, newMarket))
		)]));
	};
}

export function createMarket(transactionID, newMarket) {
	return function(dispatch, getState) {
		dispatch(updateTransactions({
			[transactionID]: { status: 'sending...' }
		}));

		if (newMarket.type === BINARY) {
			newMarket.minValue = 1;
			newMarket.maxValue = 2;
			newMarket.numOutcomes = 2;

		}
		else if (newMarket.type === SCALAR) {
			newMarket.minValue = newMarket.scalarSmallNum;
			newMarket.maxValue = newMarket.scalarBigNum;
			newMarket.numOutcomes = 2;

		}
		else if (newMarket.type === CATEGORICAL) {
			newMarket.minValue = 1;
			newMarket.maxValue = 2;
			newMarket.numOutcomes = newMarket.outcomes.length;
		}

		if (newMarket.type === CATEGORICAL) {
			newMarket.description = MakeDescriptionFromCategoricalOutcomeNames(newMarket);
		}

		AugurJS.createMarket(BRANCH_ID, newMarket, (err, res) => {
			if (err) {
				dispatch(updateTransactions({
					[transactionID]: { status: FAILED, message: err.message }
				}));
				return;
			}
			if (res.status === CREATING_MARKET) {
				newMarket.id = res.marketID;
				dispatch(updateTransactions({
					[transactionID]: { status: CREATING_MARKET }
				}));

				/*
				AugurJS.createMarketMetadata(newMarket, (err, resMetadata) => {
					if (err) {
						dispatch(updateTransactions({
							[transactionID]: { message: 'failed to save tags, source, metadata' }
						}));
						return;
					}
				});
				*/
			}
			else {
				dispatch(updateTransactions({
					[transactionID]: { status: res.status }
				}));
				if (res.status === SUCCESS) {
					dispatch(clearMakeInProgress());
					setTimeout(() => dispatch(loadMarket(res.marketID)), 5000);
				}
			}
		});
	};
}

