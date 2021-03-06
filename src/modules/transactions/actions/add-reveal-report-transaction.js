import { formatRealEther, formatRealEtherEstimate } from '../../../utils/format-number';
import { SUBMITTED, SUCCESS, FAILED } from '../../transactions/constants/statuses';
import { REVEAL_REPORT } from '../../transactions/constants/types';
import { addTransaction } from '../../transactions/actions/add-transactions';
import { updateExistingTransaction } from '../../transactions/actions/update-existing-transaction';
import { updateAssets } from '../../auth/actions/update-assets';
import { augur } from '../../../services/augurjs';

export function addRevealReportTransaction(eventID, reportedOutcomeID, salt, isUnethical, isScalar, isIndeterminate, callback) {
	return (dispatch, getState) => {
		augur.getDescription(eventID, (eventDescription) => {
			// TODO use selectMarketFromEventID
			augur.getMarket(eventID, 0, (marketID) => {
				if (!marketID || marketID.error) {
					return callback(marketID || `market not found for event ${eventID}`);
				}
				const outcome = getState().outcomesData[marketID][reportedOutcomeID] || {};
				const transaction = {
					type: REVEAL_REPORT,
					data: {
						event: eventID,
						outcome,
						description: eventDescription || getState().marketsData[marketID].description,
						reportedOutcomeID,
						isUnethical,
						isScalar,
						isIndeterminate
					},
					gasFees: formatRealEtherEstimate(augur.getTxGasEth({ ...augur.tx.MakeReports.submitReport }, augur.rpc.gasPrice))
				};
				console.info(REVEAL_REPORT, transaction.data);
				transaction.action = (transactionID) => dispatch(processRevealReport(
					transactionID,
					eventID,
					reportedOutcomeID,
					salt,
					isUnethical,
					isScalar,
					isIndeterminate,
					outcome.name || reportedOutcomeID,
					callback));
				dispatch(addTransaction(transaction));
			});
		});
	};
}

export function processRevealReport(transactionID, eventID, reportedOutcomeID, salt, isUnethical, isScalar, isIndeterminate, outcomeName, callback) {
	return (dispatch, getState) => {
		console.debug('submitReport:', {
			event: eventID,
			report: reportedOutcomeID,
			salt,
			ethics: Number(!isUnethical),
			isScalar,
			isIndeterminate
		});
		augur.submitReport({
			event: eventID,
			report: reportedOutcomeID,
			salt,
			ethics: Number(!isUnethical),
			isScalar,
			isIndeterminate,
			onSent: (r) => {
				console.debug('submitReport sent:', r);
				dispatch(updateExistingTransaction(transactionID, {
					status: SUBMITTED,
					message: `revealing reported outcome: ${outcomeName}`
				}));
			},
			onSuccess: (r) => {
				console.debug('submitReport success:', r);
				dispatch(updateExistingTransaction(transactionID, {
					status: SUCCESS,
					hash: r.hash,
					timestamp: r.timestamp,
					message: `revealed reported outcome: ${outcomeName}`,
					gasFees: formatRealEther(r.gasFees)
				}));
				dispatch(updateAssets());
				if (callback) callback(null);
			},
			onFailed: (e) => {
				console.error('submitReport failed:', e);
				dispatch(updateExistingTransaction(transactionID, {
					status: FAILED,
					message: `transaction failed: ${e.message}`
				}));
				dispatch(updateAssets());
				if (callback) callback(e);
			}
		});
	};
}
