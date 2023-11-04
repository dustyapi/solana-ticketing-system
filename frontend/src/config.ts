import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;
export const rpcHost =
  process.env.NEXT_PUBLIC_RPC_HOST || clusterApiUrl(network);

export const candyMachineId = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID ||
    "4MS6RVfLMkSWPHTMfNXxJhuPNgbTWsD3Smn8YG88gc86"
);
export const defaultGuardGroup =
  process.env.NEXT_PUBLIC_DEFAULT_GUARD_GROUP || undefined; // undefined means default


export const whitelistedWallets = [
];

export const collectionImageURL =
  process.env.NEXT_PUBLIC_COLLECTION_IMAGE_URL || "/pass.jpg";

export const collectionTitle =
  process.env.NEXT_PUBLIC_COLLECTION_TITLE || "OG Pass";

export const collectionDescription =
  process.env.NEXT_PUBLIC_COLLECTION_DESCRIPTION || "A meticulously crafted exhibit to highlight the efficiency and security of our blockchain-based ticketing system. Mint an NFT, grab your QR-code and you're set to be checked in to the venue!";

export const tokenType =
  process.env.NEXT_PUBLIC_TOKEN_TYPE || "Token";

export const websiteURL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "#";

export const twitterURL =
  process.env.NEXT_PUBLIC_TWITTER_URL || "#";

export const discordURL =
  process.env.NEXT_PUBLIC_DISCORD_URL || "#";