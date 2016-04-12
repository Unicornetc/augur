import { formatEther, formatPercent } from '../../../utils/format-number';

import { TRADING_FEE_MIN, TRADING_FEE_MAX, INITIAL_LIQUIDITY_MIN } from '../../create-market/constants/market-values-constraints';

import store from '../../../store';

export default function() {
	var { createMarketInProgress } = store.getState();
	return {
		errors: selectStep4ErrorMessages(createMarketInProgress)
	};
};

export const isValidStep4 = function(formState) {
	if (validateTradingFee(formState.tradingFeePercent)) {
		return false;
	}

	if (validateMarketInvestment(formState.initialLiquidity)) {
		return false;
	}

	return true;
};

export const selectStep4ErrorMessages = function(formState) {
	var errors = {};

	if (formState.tradingFeePercent !== undefined) {
		errors.tradingFeePercent = validateTradingFee(formState.tradingFeePercent);
	}

	if (formState.initialLiquidity !== undefined) {
		errors.initialLiquidity = validateMarketInvestment(formState.initialLiquidity);
	}

	return errors;
};

export const validateTradingFee = function(tradingFeePercent) {
	var parsed = parseFloat(tradingFeePercent);
	if (!tradingFeePercent) {
		return 'Please specify a trading fee %';
	}
	if (parsed != tradingFeePercent) {
		return 'Trading fee must be a number';
	}
	if (parsed < TRADING_FEE_MIN || parsed > TRADING_FEE_MAX) {
		return 'Trading fee must be between ' + formatPercent(TRADING_FEE_MIN, true).full + ' and ' + formatPercent(TRADING_FEE_MAX, true).full;
	}
};

export const validateMarketInvestment = function(initialLiquidity) {
	var parsed = parseFloat(initialLiquidity);
	if (!initialLiquidity) {
		return 'Please provide some initial liquidity';
	}
	if (parsed != initialLiquidity) {
		return 'Initial liquidity must be numeric';
	}
	if (parsed < INITIAL_LIQUIDITY_MIN) {
		return 'Initial liquidity must be at least ' + formatEther(INITIAL_LIQUIDITY_MIN).full;
	}
};

