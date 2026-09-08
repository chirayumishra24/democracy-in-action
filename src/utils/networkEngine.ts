import type { NetworkState, NetworkConnection } from '../types/game';

const VALID_CONNECTIONS: [string, string][] = [
  ['people', 'issue'],
  ['issue', 'participation'],
  ['participation', 'governance'],
  ['governance', 'decision'],
  ['decision', 'implementation'],
  ['implementation', 'outcome'],
  ['outcome', 'feedback'],
  ['feedback', 'people'],
];

export function isValidConnection(from: string, to: string): boolean {
  return VALID_CONNECTIONS.some(([f, t]) => f === from && t === to);
}

export function getExpectedConnections(): [string, string][] {
  return VALID_CONNECTIONS;
}

export function getNetworkProgress(network: NetworkState): number {
  const totalExpected = VALID_CONNECTIONS.length;
  const activeConnections = network.connections.filter(c => c.animated).length;
  return Math.round((activeConnections / totalExpected) * 100);
}

export function getNextExpectedConnection(network: NetworkState): NetworkConnection | null {
  for (const [from, to] of VALID_CONNECTIONS) {
    const exists = network.connections.some(c => c.from === from && c.to === to);
    if (!exists) return { from, to, animated: true };
  }
  return null;
}

export function isNetworkComplete(network: NetworkState): boolean {
  return VALID_CONNECTIONS.every(([from, to]) =>
    network.connections.some(c => c.from === from && c.to === to)
  );
}
