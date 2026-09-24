import axios from 'axios';
import { getConfig } from '../../../lib/util/getConfig.js';
import { getSetting } from '../../setting/services/setting.js';

export async function getApiBaseUrl() {
  // Config wins over the admin setting, same precedence as clientId/clientSecret.
  const paypalConfig = getConfig('system.paypal', {});
  if (paypalConfig.environment) {
    return paypalConfig.environment;
  }
  const url = await getSetting(
    'paypalEnvironment',
    'https://api-m.sandbox.paypal.com'
  );
  return url;
}

// Surface PayPal incidents on the payment settings page.
export async function fetchPaypalStatus() {
  const res = await axios.get('https://www.paypal-status.com/api/v2/status.json');
  return res.data;
}
