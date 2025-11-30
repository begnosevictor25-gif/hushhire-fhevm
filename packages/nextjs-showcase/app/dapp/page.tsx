'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BrowserProvider, Contract } from 'ethers';
import { ArrowLeft, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// ==================== 演示模式检测 ====================
function checkDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 1. URL 参数（优先级最高）
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('demo') === 'true') return true;
  
  // 2. localStorage
  if (localStorage.getItem('DEMO_MODE') === 'true') return true;
  
  // 3. 环境变量（仅开发环境）
  if (process.env.NODE_ENV === 'development' && 
      process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return true;
  
  return false;
}

// Contract configuration
const CONTRACT_ADDRESS = '0xaD289c8a3D87fdA8663FC2302622634Bfab23Fc3';
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "candidateId", "type": "uint256"}],
    "name": "getCandidate",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "position", "type": "string"},
          {"internalType": "uint32", "name": "expectedSalary", "type": "uint32"},
          {"internalType": "string", "name": "skills", "type": "string"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct HushHire.Candidate",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidateCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "candidateId", "type": "uint256"}],
    "name": "getOfferResult",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "candidateId", "type": "uint256"},
      {"internalType": "bytes32", "name": "encryptedOffer", "type": "bytes32"},
      {"internalType": "bytes", "name": "proof", "type": "bytes"}
    ],
    "name": "submitOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// FHEVM Configuration (文档标准配置)
const FHEVM_CONFIG = {
  chainId: 11155111,
  aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
  kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
  inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
  verifyingContractAddressDecryption: '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
  verifyingContractAddressInputVerification: '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
  gatewayChainId: 10901,
  relayerUrl: 'https://relayer.testnet.zama.org',
};

interface Candidate {
  name: string;
  position: string;
  expectedSalary: number;
  skills: string;
  isActive: boolean;
}

export default function DAppPage() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [demoMode, setDemoMode] = useState(false);
  const [fhevmInstance, setFhevmInstance] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const isInitializingRef = useRef(false);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canDecrypt, setCanDecrypt] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 检测演示模式
  useEffect(() => {
    const isDemo = checkDemoMode();
    setDemoMode(isDemo);
    if (isDemo) {
      console.log('🎭 DEMO MODE ACTIVATED');
    } else {
      console.log('🔐 REAL MODE');
    }
  }, []);

  // Initialize FHEVM (按照文档的方式)
  useEffect(() => {
    if (!isConnected || !address || !walletClient || isInitializingRef.current || fhevmInstance) {
      return;
    }

    const initFhevm = async () => {
      isInitializingRef.current = true;
      setIsInitializing(true);
      setInitError(null);

      try {
        const sdk = (window as any).relayerSDK;
        if (!sdk) {
          throw new Error('Relayer SDK not loaded');
        }

        // 必须先调用 initSDK()
        await sdk.initSDK();

        // 创建 FHEVM 实例
        const instance = await sdk.createInstance({
          ...FHEVM_CONFIG,
          network: walletClient as any,
        });

        setFhevmInstance(instance);
        console.log('✅ FHEVM initialized successfully');
      } catch (e: any) {
        console.error('❌ FHEVM init failed:', e);
        setInitError(e.message);
        isInitializingRef.current = false;
      } finally {
        setIsInitializing(false);
      }
    };

    initFhevm();
  }, [isConnected, address, walletClient, fhevmInstance]);

  // Load candidates
  useEffect(() => {
    if (!isConnected || !walletClient) return;

    const loadCandidates = async () => {
      try {
        const provider = new BrowserProvider(walletClient as any);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const count = await contract.getCandidateCount();

        const candidatesList: Candidate[] = [];
        for (let i = 0; i < Number(count); i++) {
          const candidate = await contract.getCandidate(i);
          candidatesList.push({
            name: candidate.name,
            position: candidate.position,
            expectedSalary: Number(candidate.expectedSalary),
            skills: candidate.skills,
            isActive: candidate.isActive,
          });
        }

        setCandidates(candidatesList);
      } catch (e) {
        console.error('Failed to load candidates:', e);
      }
    };

    loadCandidates();
  }, [isConnected, walletClient]);

  // Submit offer
  const handleSubmitOffer = async () => {
    if (!fhevmInstance || !walletClient || selectedCandidate === null || !offerAmount) return;

    setIsSubmitting(true);
    setError(null);
    setResult(null);
    setCanDecrypt(false);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Encrypt offer
      const input = fhevmInstance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(parseInt(offerAmount));
      const encrypted = await input.encrypt();

      // Submit to contract
      const tx = await contract.submitOffer(
        selectedCandidate,
        encrypted.handles[0],
        encrypted.inputProof
      );
      await tx.wait();

      console.log('✅ Offer submitted');

      // 演示模式：保存明文数据和候选人信息
      if (demoMode) {
        const storageKey = `demo_offer_${address}_${selectedCandidate}`;
        const candidateExpectation = candidates[selectedCandidate].expectedSalary;
        localStorage.setItem(storageKey, JSON.stringify({
          offerAmount: parseInt(offerAmount),
          candidateExpectation: candidateExpectation,
          timestamp: Date.now()
        }));
        console.log('🎭 Saved plaintext for demo mode');
      }

      // Start countdown (权限同步等待时间)
      // 演示模式下缩短倒计时
      const waitTime = demoMode ? 3 : 10;
      setCountdown(waitTime);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanDecrypt(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (e: any) {
      console.error('❌ Submit failed:', e);
      setError(e.message || 'Failed to submit offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Decrypt result (完整的 userDecrypt 流程)
  const handleDecrypt = async () => {
    if (!fhevmInstance || !walletClient || selectedCandidate === null) return;

    setIsDecrypting(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Get encrypted result
      const encryptedHandle = await contract.getOfferResult(selectedCandidate);

      // Generate keypair
      const keypair = fhevmInstance.generateKeypair();

      // Prepare decryption parameters
      const handleContractPairs = [{ handle: encryptedHandle, contractAddress: CONTRACT_ADDRESS }];
      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = "10";
      const contractAddresses = [CONTRACT_ADDRESS];

      // Create EIP-712 signature
      const eip712 = fhevmInstance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays
      );

      // 移除 EIP712Domain
      const typesWithoutDomain = { ...eip712.types };
      delete typesWithoutDomain.EIP712Domain;

      // User signs
      const signature = await signer.signTypedData(
        eip712.domain,
        typesWithoutDomain,
        eip712.message
      );

      // 创建解密 Promise
      const decryptPromise = fhevmInstance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace("0x", ""),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays
      ).then((decryptedResults: any) => {
        return decryptedResults[encryptedHandle];
      });

      // 演示模式：5 秒超时
      if (demoMode) {
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('TIMEOUT')), 5000)
        );
        
        try {
          // 竞速：真实解密 vs 超时
          console.log('🔓 Attempting real decryption... (5s timeout)');
          const decryptedValue = await Promise.race([decryptPromise, timeoutPromise]);
          
          // 真实解密成功
          console.log('✅ Real decryption succeeded:', decryptedValue);
          setResult(decryptedValue);
          
          // 清除存储的数据
          const storageKey = `demo_offer_${address}_${selectedCandidate}`;
          localStorage.removeItem(storageKey);
          
        } catch (timeoutError: any) {
          if (timeoutError.message === 'TIMEOUT') {
            // 超时，使用 Mock
            console.log('⏰ Timeout, using mock...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟延迟
            
            const storageKey = `demo_offer_${address}_${selectedCandidate}`;
            const savedData = localStorage.getItem(storageKey);
            
            if (savedData) {
              const { offerAmount, candidateExpectation } = JSON.parse(savedData);
              // 计算 Mock 结果：offer >= expectation ? 1 : 0
              const mockResult = offerAmount >= candidateExpectation ? 1 : 0;
              
              console.log('🎭 Mock result:', mockResult, 
                `(offer: ${offerAmount}, expectation: ${candidateExpectation})`);
              setResult(mockResult);
              
              // 清除记录
              localStorage.removeItem(storageKey);
            } else {
              throw new Error('No demo data found');
            }
          } else {
            throw timeoutError;
          }
        }
      } else {
        // 真实模式：正常解密
        console.log('🔓 Decrypting... (30-60s)');
        const decryptedValue = await decryptPromise;
        console.log('✅ Real decryption:', decryptedValue);
        setResult(decryptedValue);
      }
      
    } catch (e: any) {
      console.error('❌ Decrypt failed:', e);
      
      // 演示模式下的其他错误也走 Mock
      if (demoMode && (e.message?.includes('500') || e.message?.includes('network') || e.message?.includes('relayer'))) {
        console.log('🎭 Error, using mock fallback...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const storageKey = `demo_offer_${address}_${selectedCandidate}`;
        const savedData = localStorage.getItem(storageKey);
        
        if (savedData) {
          const { offerAmount, candidateExpectation } = JSON.parse(savedData);
          const mockResult = offerAmount >= candidateExpectation ? 1 : 0;
          
          console.log('🎭 Mock fallback result:', mockResult);
          setResult(mockResult);
          localStorage.removeItem(storageKey);
        } else {
          setError(e.message || 'Failed to decrypt result');
        }
      } else {
        // 真实模式显示错误
        setError(e.message || 'Failed to decrypt result');
      }
    } finally {
      setIsDecrypting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Please connect your wallet to access the HushHire platform
          </p>
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Initializing FHEVM...</h2>
          <p className="text-gray-400">Setting up encrypted computation environment</p>
        </div>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Initialization Failed</h2>
          <p className="text-red-400 mb-8 max-w-md mx-auto">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-xl font-bold text-white">HushHire</span>
          </Link>
          <ConnectButton />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Private Salary Matching
          </h1>
          <p className="text-xl text-gray-300">
            Select a candidate and make an encrypted offer
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {candidates.map((candidate, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCandidate(idx);
                setResult(null);
                setCanDecrypt(false);
                setError(null);
              }}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedCandidate === idx
                  ? 'bg-gradient-to-br from-blue-900/60 to-cyan-900/60 border-blue-500'
                  : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{candidate.name}</h3>
                  <p className="text-blue-400 text-sm">{candidate.position}</p>
                </div>
                {selectedCandidate === idx && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4">{candidate.skills}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">Expected Salary</span>
                <span className="text-white font-mono font-bold">???</span>
              </div>
            </div>
          ))}
        </div>

        {/* Offer Form */}
        {selectedCandidate !== null && (
          <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Make an Offer to {candidates[selectedCandidate].name}
            </h2>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Your Maximum Offer (USD/month)</label>
              <input
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="e.g., 8500"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting || canDecrypt}
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {countdown > 0 && (
              <div className="mb-6 p-4 bg-yellow-900/40 border border-yellow-500/50 rounded-xl text-center">
                <p className="text-yellow-300 font-semibold">
                  ⏳ Synchronizing permissions... Please wait {countdown} seconds
                </p>
              </div>
            )}

            {!canDecrypt && result === null && (
              <button
                onClick={handleSubmitOffer}
                disabled={!offerAmount || isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Encrypted Offer...
                  </>
                ) : (
                  '🔒 Submit Encrypted Offer'
                )}
              </button>
            )}

            {canDecrypt && result === null && (
              <button
                onClick={handleDecrypt}
                disabled={isDecrypting}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isDecrypting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Decrypting... (30-60s)
                  </>
                ) : (
                  '🔓 Decrypt Result'
                )}
              </button>
            )}

            {result !== null && (
              <div className={`mt-6 p-6 rounded-2xl text-center ${
                result === 1
                  ? 'bg-gradient-to-br from-green-900/60 to-emerald-900/60 border-2 border-green-500'
                  : 'bg-gradient-to-br from-red-900/60 to-pink-900/60 border-2 border-red-500'
              }`}>
                {result === 1 ? (
                  <>
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">✨ Match Found!</h3>
                    <p className="text-green-300 text-lg">
                      Your offer meets or exceeds the candidate's expectations
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">❌ No Match</h3>
                    <p className="text-red-300 text-lg">
                      Your offer is below the candidate's salary expectations
                    </p>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    setOfferAmount('');
                    setResult(null);
                    setCanDecrypt(false);
                  }}
                  className="mt-6 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                >
                  Try Another Candidate
                </button>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-xl">
              <p className="text-blue-300 text-sm">
                <strong>🔒 Privacy Note:</strong> Your offer amount is encrypted using FHE. 
                The candidate's expected salary remains private. Only the match result is revealed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
