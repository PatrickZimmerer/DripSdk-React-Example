import { useState, useEffect } from 'react';
import './App.css';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { PerqSdk } from '@dripfi/drip-sdk';
import { PerqSupportedChainId, PRODUCTION } from '@dripfi/drip-sdk/dist/types/PerqConfig';
import { ethers } from 'ethers';

function App() {
	const { address, isConnected } = useAccount();
	const { connect, connectors, error: connectError } = useConnect();
	const { disconnect } = useDisconnect();
	const [dripSdk, setDripSdk] = useState<PerqSdk | null>(null);
	const [loyaltyCard, setLoyaltyCard] = useState<any>(null);

	useEffect(() => {
		const initializeDripSdk = async () => {
			if (isConnected && window.ethereum) {
				try {
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner();
					const chainId = (await signer.getChainId()) as PerqSupportedChainId;

					// Initialize dripSdk with the signer
					const sdk = new PerqSdk(PRODUCTION, chainId);
					sdk.updateSigner(signer, chainId);
					setDripSdk(sdk);
					console.log('new perqSdk', sdk);
				} catch (error) {
					console.error('Error initializing dripSdk:', error);
				}
			}
		};

		initializeDripSdk();
	}, [isConnected]);

	useEffect(() => {
		const fetchLoyaltyCard = async () => {
			if (dripSdk && isConnected) {
				try {
					const card = await dripSdk.loyaltyCards.getOwnedLoyaltyCard();
					setLoyaltyCard(card);
				} catch (error) {
					console.error('Error fetching loyalty card:', error);
				}
			}
		};

		fetchLoyaltyCard();
	}, [dripSdk, isConnected]);

	return (
		<div>
			<div className="wallet-section">
				<h2>Wallet Connection</h2>
				{!isConnected ? (
					<div>
						<button onClick={() => connect({ connector: connectors[0] })}>Connect Wallet</button>
						{connectError && <p style={{ color: 'red' }}>Error: {connectError.message}</p>}
					</div>
				) : (
					<div>
						<p>Connected Address: {address}</p>
						<button onClick={() => disconnect()}>Disconnect</button>
					</div>
				)}
			</div>

			{isConnected && (
				<div className="loyalty-card-section">
					<h2>Loyalty Card</h2>
					{loyaltyCard ? (
						<div>
							<pre>{JSON.stringify(loyaltyCard, null, 2)}</pre>
						</div>
					) : (
						<p>No loyalty card found</p>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
