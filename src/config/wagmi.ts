import { http, createConfig } from 'wagmi';
import { base, mainnet, sonic } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = '<WALLETCONNECT_PROJECT_ID>';

export const config = createConfig({
	chains: [mainnet, base, sonic],
	connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
		[sonic.id]: http(),
	},
});
