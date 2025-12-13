# HushHire Deployment Information

## 🚀 Contract Deployment

**Network**: Ethereum Sepolia Testnet  
**Contract Address**: `0xaD289c8a3D87fdA8663FC2302622634Bfab23Fc3`  
**Deployer Address**: `0x0FB01E069DB8DC5fCF8CE0Eb9625d732C7589348`  
**Transaction Hash**: `0x26926629920cbb1c4223e6ea2abc4a2d94f81f74222066bafe6e68f4af2c55b1`  
**Gas Used**: 1,895,572

**View on Etherscan**: https://sepolia.etherscan.io/address/0xaD289c8a3D87fdA8663FC2302622634Bfab23Fc3

---

## 🌐 Local Development Server

**Status**: ✅ Running  
**URL**: http://localhost:3003  
**Framework**: Next.js 15.0.3  
**Start Time**: Ready in 6s

---

## 👥 Pre-loaded Candidates

| ID | Name | Position | Expected Salary |
|----|------|----------|----------------|
| 0 | Alice Chen | Senior Full-Stack Developer | $8,000/month |
| 1 | Bob Martinez | DevOps Engineer | $7,500/month |
| 2 | Carol Wang | Product Designer | $6,500/month |
| 3 | David Kim | Machine Learning Engineer | $9,500/month |
| 4 | Emma Johnson | Frontend Developer | $7,000/month |

---

## 🧪 Quick Test Guide

1. **Open Browser**: Visit http://localhost:3003
2. **View Landing Page**: Beautiful gradient design with complete narrative
3. **Click "Launch App"**: Navigate to DApp page
4. **Connect Wallet**: Use MetaMask on Sepolia network
5. **Select Candidate**: Choose any of the 5 candidates
6. **Enter Offer**: Try $8,500 for Alice Chen (should match)
7. **Submit Offer**: Wait for transaction confirmation
8. **Wait 10 seconds**: Permission synchronization countdown
9. **Decrypt Result**: Click to reveal match status

---

## 🔑 Test Scenarios

### ✅ Match Example
- **Candidate**: Alice Chen (expects $8,000)
- **Your Offer**: $8,500
- **Result**: ✅ Match!

### ❌ No Match Example
- **Candidate**: David Kim (expects $9,500)
- **Your Offer**: $8,000
- **Result**: ❌ No Match

### 🎯 Edge Case
- **Candidate**: Bob Martinez (expects $7,500)
- **Your Offer**: Exactly $7,500
- **Result**: ✅ Match (>= comparison)

---

## 📁 Project Structure

```
hushhire/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/HushHire.sol
│   │   ├── deploy/deploy_hushhire.ts
│   │   └── deployments/sepolia/HushHire.json
│   └── nextjs-showcase/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx (Landing)
│       │   └── dapp/page.tsx (DApp)
│       ├── components/
│       │   ├── Providers.tsx
│       │   └── ClientProviders.tsx
│       └── utils/wallet.ts
└── README.md
```

---

## ⚙️ Technical Configuration

### FHEVM System Contracts (Sepolia)
```typescript
chainId: 11155111
aclContractAddress: 0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D
kmsContractAddress: 0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A
inputVerifierContractAddress: 0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0
verifyingContractAddressDecryption: 0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478
verifyingContractAddressInputVerification: 0x483b9dE06E4E4C7D35CCf5837A1668487406D955
gatewayChainId: 10901
relayerUrl: https://relayer.testnet.zama.org
```

### Relayer SDK Version
- **CDN URL**: https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs
- **Strategy**: beforeInteractive

---

## 🎉 Project Complete!

All components are successfully deployed and running:
- ✅ Smart contract deployed to Sepolia
- ✅ Landing page with deep narrative
- ✅ DApp page with FHE integration
- ✅ Comprehensive English README
- ✅ Local development server running

**Next Steps**:
1. Test all user flows
2. Optional: Deploy to Vercel for public access
3. Optional: Push to GitHub repository


