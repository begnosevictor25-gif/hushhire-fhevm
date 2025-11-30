# HushHire 🤫💼

> **Privacy-First Recruitment Platform** powered by Fully Homomorphic Encryption (FHE)

Match salary expectations without revealing sensitive information. Zero-knowledge proofs meet recruitment—where both employers and candidates keep their cards close.

![Built with FHEVM v0.9](https://img.shields.io/badge/FHEVM-v0.9-purple)
![Zama](https://img.shields.io/badge/Powered%20by-Zama-pink)
![Ethereum](https://img.shields.io/badge/Network-Sepolia-blue)

---

## 🌟 The Problem

### The Hiring Paradox

Traditional recruitment forces premature disclosure of salary information, creating an inherently **asymmetric negotiation dynamic**:

**For Employers:**
- Revealing budget caps gives candidates unfair leverage
- Early salary disclosure attracts mercenaries, not culture fits  
- Competitors gain insight into compensation strategies
- Internal pay equity is compromised when ranges become public

**For Candidates:**
- Stating expectations too early locks in suboptimal offers
- Asking too high filters you out; too low leaves money on the table
- Current salary disclosure perpetuates historical pay gaps
- Multiple interview rounds waste time on misaligned expectations

**The Cost?** **$400B+ annually** in hiring inefficiencies. Mismatched salary expectations account for **40% of interview process failures** globally.

---

## 💡 The Solution: FHE-Powered Matching

HushHire leverages **Fully Homomorphic Encryption (FHE)** to perform confidential salary comparisons **directly on encrypted data**—without ever decrypting sensitive information.

### How It Works

```
1. 🔒 ENCRYPT
   Employer encrypts their maximum offer using FHE
   → Plaintext value never touches the blockchain

2. ⚡ COMPUTE
   Smart contract performs encrypted comparison:
   enc(offer) ≥ enc(candidate_expectation)
   → Computation happens on ciphertext

3. ✅ REVEAL MATCH
   Only the binary result (Match/No Match) is decrypted
   → Actual salary numbers stay private forever
```

### Technical Stack

- **Blockchain**: Ethereum Sepolia Testnet
- **FHE Framework**: [Zama FHEVM v0.9](https://docs.zama.org/fhevm)
- **Smart Contract**: Solidity 0.8.24 with `ZamaEthereumConfig`
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **Wallet Integration**: RainbowKit v2 + Wagmi
- **Encryption SDK**: Zama Relayer SDK 0.3.0-5

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm**
- **MetaMask** or compatible Web3 wallet
- Sepolia ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/hushhire.git
cd hushhire

# Install dependencies
pnpm install

# Start development server
cd packages/nextjs-showcase
pnpm dev
```

Visit **http://localhost:3000** to see the app!

### Quick Test

1. **Connect Wallet** (Sepolia network)
2. **Select a Candidate** from the pre-loaded list
3. **Enter Your Offer** (e.g., $8,500/month)
4. **Submit** → Encrypted and sent to blockchain
5. **Decrypt** → See if it's a match! 🎉

---

## 🏗️ Architecture

### Smart Contract (`HushHire.sol`)

**Deployed at:** `0xaD289c8a3D87fdA8663FC2302622634Bfab23Fc3` (Sepolia)

```solidity
// Core function: Submit encrypted offer
function submitOffer(
    uint256 candidateId,
    externalEuint32 encryptedOffer,
    bytes calldata proof
) external {
    euint32 offer = FHE.fromExternal(encryptedOffer, proof);
    euint32 expectedSalary = FHE.asEuint32(candidates[candidateId].expectedSalary);
    
    // Encrypted comparison
    ebool isMatch = FHE.ge(offer, expectedSalary);
    
    // Store encrypted result
    euint32 result = FHE.select(isMatch, one, zero);
    offerResults[msg.sender][candidateId] = result;
    
    // Grant permissions
    FHE.allowThis(result);           // Contract can access
    FHE.allow(result, msg.sender);   // Employer can decrypt
}
```

**Pre-loaded Candidates:**

| ID | Name | Position | Expected Salary | Skills |
|----|------|----------|----------------|--------|
| 0 | Alice Chen | Senior Full-Stack Developer | $8,000/mo | React, Node.js, PostgreSQL, AWS |
| 1 | Bob Martinez | DevOps Engineer | $7,500/mo | Kubernetes, Docker, CI/CD, Terraform |
| 2 | Carol Wang | Product Designer | $6,500/mo | Figma, User Research, Prototyping |
| 3 | David Kim | ML Engineer | $9,500/mo | Python, TensorFlow, PyTorch, NLP |
| 4 | Emma Johnson | Frontend Developer | $7,000/mo | Vue.js, TypeScript, Tailwind CSS |

### Frontend Architecture

**Key Features:**
- **FHEVM Initialization**: Automatic SDK setup with proper error handling
- **Wallet Integration**: RainbowKit v2 with MetaMask support
- **Encryption Flow**: User-friendly offer submission with FHE encryption
- **Decryption with `userDecrypt`**: EIP-712 signature-based decryption
- **10-Second Countdown**: Permission synchronization wait time
- **Responsive UI**: Beautiful gradient design with Tailwind CSS

**Security Measures:**
- CORS headers for FHEVM WebAssembly (`credentialless` mode)
- Webpack fallback for MetaMask SDK compatibility
- Client-side only rendering (SSR disabled)
- Anti-double-initialization with `useRef`

---

## 🔒 Privacy Guarantees

### What Stays Private

✅ **Employer's Offer Amount**: Encrypted before leaving the browser  
✅ **Candidate's Salary Expectations**: Hardcoded in contract, never exposed  
✅ **Comparison Logic**: Executed on encrypted data (FHE magic)  

### What Gets Revealed

⚠️ **Only the Binary Result**:
- `1` = Match (offer ≥ expectation)
- `0` = No Match (offer < expectation)

**No intermediate values, no partial leaks, no backdoors.**

---

## 📊 Business Model & Roadmap

### Phase 1: MVP (✅ Complete)
- [x] FHEVM v0.9 integration
- [x] Basic salary matching with 5 demo candidates
- [x] Sepolia testnet deployment
- [x] Landing page with deep narrative

### Phase 2: Advanced Matching (Q2 2024)
- [ ] Multi-factor matching (skills, experience, benefits)
- [ ] Batch candidate screening
- [ ] Mainnet launch
- [ ] Job posting integration

### Phase 3: Two-Sided Marketplace (Q4 2024)
- [ ] Candidate onboarding and profile creation
- [ ] Recruiter dashboard with analytics
- [ ] Company verification and ratings
- [ ] Token incentives for both sides

### Phase 4: Enterprise Scale (2025)
- [ ] API for ATS (Applicant Tracking System) integration
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Regulatory compliance (GDPR, CCPA)
- [ ] White-label licensing for HR platforms

---

## 🎯 Use Cases

### 1. **Startup Hiring** 🚀
Fast-growing startups can screen hundreds of candidates efficiently without revealing their tight budget constraints.

### 2. **Executive Recruiting** 💼  
C-suite searches require extreme confidentiality. HushHire prevents leaks that could destabilize organizations.

### 3. **Freelance Platforms** 💻
Gig economy platforms can match clients with contractors based on budget fit without price wars.

### 4. **Pay Equity Audits** ⚖️
HR departments can use FHE to ensure internal pay equity without exposing individual salaries.

### 5. **Cross-Border Hiring** 🌍
Navigate diverse salary expectations across countries while maintaining competitive secrecy.

---

## 🧪 Testing

### Contract Testing

```bash
cd packages/hardhat
pnpm hardhat:test
```

### Frontend Testing

Try these scenarios:

1. **Match Scenario**:
   - Select Alice Chen (expects $8,000)
   - Offer $8,500
   - Result: ✅ Match

2. **No Match Scenario**:
   - Select David Kim (expects $9,500)
   - Offer $8,000
   - Result: ❌ No Match

3. **Edge Case**:
   - Select Bob Martinez (expects $7,500)
   - Offer exactly $7,500
   - Result: ✅ Match (>= comparison)

---

## 🛠️ Development

### Project Structure

```
hushhire/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/
│   │   │   └── HushHire.sol         # Core FHE contract
│   │   ├── deploy/
│   │   │   └── deploy_hushhire.ts   # Deployment script
│   │   └── hardhat.config.ts        # Network configuration
│   └── nextjs-showcase/
│       ├── app/
│       │   ├── layout.tsx           # Root layout + FHEVM SDK
│       │   ├── page.tsx             # Landing page
│       │   └── dapp/
│       │       └── page.tsx         # DApp interface
│       ├── components/
│       │   ├── Providers.tsx        # RainbowKit setup
│       │   └── ClientProviders.tsx  # SSR wrapper
│       ├── utils/
│       │   └── wallet.ts            # Provider utilities
│       ├── next.config.js           # CORS + Webpack config
│       └── vercel.json              # Deployment config
└── README.md
```

### Key Configuration Files

**`next.config.js`** - CORS Headers:
```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
    ],
  }];
}
```

**FHEVM System Contracts (Sepolia):**
```typescript
const FHEVM_CONFIG = {
  chainId: 11155111,
  aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
  kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
  inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
  // ... (see code for full config)
};
```

---

## 🐛 Troubleshooting

### "FHEVM initialization failed"
- **Solution**: Hard refresh (Cmd+Shift+R) and clear browser cache
- **Reason**: Multiple wallet extensions conflict

### "User decrypt failed: 500"
- **Solution**: Wait the full 10-second countdown before decrypting
- **Reason**: Permission synchronization on relayer takes time

### "No wallet provider found"
- **Solution**: Ensure MetaMask is installed and unlocked
- **Reason**: Wagmi needs active wallet connection

### Build Errors on Vercel
- **Solution**: Check `next.config.js` has Webpack fallback config
- **Reason**: MetaMask SDK needs Node.js module polyfills

---

## 📚 Resources

- **Zama FHEVM Docs**: https://docs.zama.org/fhevm
- **Contract Addresses**: https://docs.zama.org/protocol/solidity-guides/smart-contract/configure/contract_addresses
- **RainbowKit**: https://www.rainbowkit.com/docs
- **Sepolia Etherscan**: https://sepolia.etherscan.io/address/0xaD289c8a3D87fdA8663FC2302622634Bfab23Fc3

---

## 🤝 Contributing

HushHire is an open-source demonstration of FHE in recruitment. Contributions welcome!

### Ideas for Contributors:
- Add more candidate attributes (years of experience, education)
- Implement range-based matching (e.g., $80k-$90k)
- Build a recruiter dashboard
- Add candidate-side interface (apply with encrypted expectations)
- Optimize gas costs

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- **Zama** for the revolutionary FHEVM technology
- **Ethereum Foundation** for Sepolia testnet infrastructure
- **RainbowKit** team for seamless wallet integration
- **Next.js** team for the amazing React framework

---

## 📬 Contact

**Project Maintainer**: [Your Name]  
**Demo**: [https://hushhire.vercel.app](https://hushhire.vercel.app) _(coming soon)_  
**Twitter**: [@HushHire](https://twitter.com/hushhire) _(coming soon)_

---

<div align="center">
  
### 🔒 **Built with Privacy. Powered by Math.** 🔐

*HushHire - Where talent meets opportunity, without compromising confidentiality.*

</div>
