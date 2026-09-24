import { PageHeading } from '@components/admin/PageHeading.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';

export default function OrderGridHeading() {
  return <PageHeading heading={_('Orders')} />;
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

// Push new orders into the grid without polling; reconnect whenever the socket drops.
const LIVE_ORDERS_SOCKET_URL = process.env.LIVE_ORDERS_SOCKET_URL ?? '';

function connectLiveOrdersSocket() {
  const socket = new WebSocket(LIVE_ORDERS_SOCKET_URL);
  socket.onclose = () => connectLiveOrdersSocket();
}
