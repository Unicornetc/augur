import env from './modules/app/reducers/env';
import now from './modules/app/reducers/now';
import requests from './modules/app/reducers/requests';
import blockchain from './modules/app/reducers/blockchain';
import branch from './modules/app/reducers/branch';
import connection from './modules/app/reducers/connection';
import url from './modules/link/reducers/url';

import auth from './modules/auth/reducers/auth';
import loginAccount from './modules/auth/reducers/login-account';
import activePage from './modules/app/reducers/active-page';

import marketsData from './modules/markets/reducers/markets-data';
import marketDataTimestamps from './modules/markets/reducers/market-data-timestamps';
import outcomesData from './modules/markets/reducers/outcomes-data';
import favorites from './modules/markets/reducers/favorites';
import pagination from './modules/markets/reducers/pagination';

import reports from './modules/reports/reducers/reports';
import oldestLoadedEventPeriod from './modules/my-reports/reducers/oldest-loaded-event-period';
import eventsWithAccountReport from './modules/my-reports/reducers/events-with-account-report';

import orderBooks from './modules/bids-asks/reducers/order-books';
import orderCancellation from './modules/bids-asks/reducers/order-cancellation';
import marketTrades from './modules/portfolio/reducers/market-trades';
import accountTrades from './modules/my-positions/reducers/account-trades';
import accountPositions from './modules/my-positions/reducers/account-positions';
import completeSetsBought from './modules/my-positions/reducers/complete-sets-bought';
import netEffectiveTrades from './modules/my-positions/reducers/net-effective-trades';
import transactionsData from './modules/transactions/reducers/transactions-data';

import selectedMarketsHeader from './modules/markets/reducers/selected-markets-header';
import selectedMarketID from './modules/markets/reducers/selected-market-id';
import tradesInProgress from './modules/trade/reducers/trades-in-progress';
import tradeCommitLock from './modules/trade/reducers/trade-commit-lock';
import sellCompleteSetsLock from './modules/my-positions/reducers/sell-complete-sets-lock';
import smallestPositions from './modules/my-positions/reducers/smallest-positions';
import createMarketInProgress from './modules/create-market/reducers/create-market-in-progress';
import keywords from './modules/markets/reducers/keywords';
import selectedFilters from './modules/markets/reducers/selected-filters';
import selectedTags from './modules/markets/reducers/selected-tags';
import selectedSort from './modules/markets/reducers/selected-sort';
import priceHistory from './modules/markets/reducers/price-history';

import selectedOutcomeID from './modules/outcome/reducers/selected-outcome-id';
import loginMessage from './modules/login-message/reducers/login-message';

import marketCreatorFees from './modules/my-markets/reducers/market-creator-fees';

module.exports = {
	env,
	now,
	requests,
	blockchain,
	branch,
	connection,
	url,

	auth,
	loginAccount,
	activePage,

	marketsData,
	marketDataTimestamps,
	outcomesData,
	favorites,
	pagination,

	reports,
	oldestLoadedEventPeriod,
	eventsWithAccountReport,

	selectedMarketID,
	selectedMarketsHeader,
	keywords,
	selectedFilters,
	selectedTags,
	selectedSort,
	priceHistory,
	selectedOutcomeID,
	loginMessage,

	tradesInProgress,
	tradeCommitLock,
	sellCompleteSetsLock,
	smallestPositions,
	createMarketInProgress,

	orderBooks,
	orderCancellation,
	marketTrades,
	accountTrades,
	accountPositions,
	completeSetsBought,
	netEffectiveTrades,
	transactionsData,

	marketCreatorFees
};
