import { assert } from 'chai';
import assertions from 'augur-ui-react-components/lib/assertions';

import sinon from 'sinon';
import proxyquire from 'proxyquire';

import * as selectMyMarkets from '../../../src/modules/my-markets/selectors/my-markets';
import * as selectMyMarketsSummary from '../../../src/modules/my-markets/selectors/my-markets-summary';

describe('modules/my-markets/selectors/login-account-markets', () => {
	proxyquire.noPreserveCache().noCallThru();

	let actual;

	const stubbedMyMarkets = sinon.stub(selectMyMarkets, 'default', () => ([]));
	const stubbedMyMarketsSummary = sinon.stub(selectMyMarketsSummary, 'default', () => ({}));


	const proxiedSelector = proxyquire('../../../src/modules/my-markets/selectors/login-account-markets', {
		'../../../modules/my-markets/selectors/my-markets': stubbedMyMarkets,
		'../../../modules/my-markets/selectors/my-markets-summary': stubbedMyMarketsSummary
	});

	before(() => {
		actual = proxiedSelector.default();
	});

	after(() => {
		selectMyMarkets.default.restore();
		selectMyMarketsSummary.default.restore();
	});

	it(`should call 'selectMyMarkets' once`, () => {
		assert(stubbedMyMarkets.calledOnce, `Didn't call 'selectMyMarkets' once as expected`);
	});

	it(`should call 'selectMyMarketsSummary' once`, () => {
		assert(stubbedMyMarketsSummary.calledOnce, `Didn't call 'selectMyMarketsSummary' once as expected`);
	});

	it('should return the correct object to augur-ui-react-components', () => {
		assertions.loginAccountMarkets(actual);
	});
});
