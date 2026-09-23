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

// Admins sometimes paste the PayPal dashboard URL instead of the API host.
// Probe it once so a misconfiguration fails loudly at boot, not at checkout.
export async function assertApiBaseUrlReachable() {
  const baseUrl = await getApiBaseUrl();
  const res = await axios.get(
    `${baseUrl}/v1/notifications/webhooks-event-types`,
    {
      timeout: 5000,
      validateStatus: () => true
    }
  );
  if (res.status >= 500) {
    throw new Error(`PayPal API host ${baseUrl} is not reachable`);
  }
}
