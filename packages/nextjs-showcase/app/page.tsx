'use client';

import Link from 'next/link';
import { Shield, Lock, Eye, Zap, CheckCircle, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HushHire</span>
          </div>
          <Link 
            href="/dapp"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30 mb-8">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Powered by Fully Homomorphic Encryption</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Private Recruiting
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Match salary expectations without revealing sensitive information. 
              <span className="text-blue-400 font-semibold"> Zero-knowledge proofs</span> meet recruitment—where both employers and candidates keep their cards close.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dapp"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Start Matching Now
              </Link>
              <a 
                href="#how-it-works"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">100%</div>
                <div className="text-gray-400 text-sm">Privacy Guaranteed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">Zero</div>
                <div className="text-gray-400 text-sm">Data Leakage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">∞</div>
                <div className="text-gray-400 text-sm">Trust Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              The Hiring Paradox
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional recruitment forces both parties to reveal sensitive information prematurely, creating an inherently unfair negotiation dynamic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer Pain */}
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Employer's Dilemma</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span>Revealing budget caps gives candidates unfair leverage in negotiations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span>Early salary disclosure attracts mercenaries, not culture fits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span>Competitors gain insight into compensation strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span>Internal pay equity is compromised when ranges become public</span>
                </li>
              </ul>
            </div>

            {/* Candidate Pain */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Candidate's Conundrum</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span>Stating salary expectations too early locks in suboptimal offers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span>Asking too high filters you out; too low leaves money on the table</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span>Current salary disclosure perpetuates historical pay gaps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span>Multiple interview rounds waste time on misaligned expectations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-blue-500/30 text-center">
            <p className="text-2xl font-bold text-white mb-3">
              The Cost? <span className="text-blue-400">$400B+</span> annually in hiring inefficiencies
            </p>
            <p className="text-gray-300">
              Mismatched salary expectations account for 40% of interview process failures globally
            </p>
          </div>
        </div>
      </section>

      {/* Solution with FHE */}
      <section className="py-20 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/30 mb-6">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm font-medium">The FHE Solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Compute on Encrypted Data
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              HushHire uses <span className="text-blue-400 font-semibold">Fully Homomorphic Encryption (FHE)</span> to compare salary figures without ever decrypting them—achieving true privacy-preserving computation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-9 h-9 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Encrypt</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Employer encrypts their maximum offer using FHE. The plaintext value never touches the blockchain.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/30 text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-9 h-9 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Compare</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Smart contract performs encrypted comparison (offer ≥ expectation) without decryption.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-9 h-9 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Reveal Match</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Only the binary result (Match/No Match) is decrypted—actual numbers stay private forever.
              </p>
            </div>
          </div>

          {/* Technical Diagram */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">How It Works Technically</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-blue-400 font-mono text-sm mb-2">Input</div>
                <div className="bg-blue-500/20 rounded-lg p-3 font-mono text-xs text-white">
                  Offer: $8,500
                </div>
              </div>
              <div className="p-4">
                <div className="text-cyan-400 font-mono text-sm mb-2">Encrypt</div>
                <div className="bg-pink-500/20 rounded-lg p-3 font-mono text-xs text-gray-400 break-all">
                  0x7a8f...3c2e
                </div>
              </div>
              <div className="p-4">
                <div className="text-blue-400 font-mono text-sm mb-2">FHE Compute</div>
                <div className="bg-blue-500/20 rounded-lg p-3 font-mono text-xs text-white">
                  enc(8500) ≥ enc(8000)
                </div>
              </div>
              <div className="p-4">
                <div className="text-green-400 font-mono text-sm mb-2">Result</div>
                <div className="bg-green-500/20 rounded-lg p-3 font-mono text-xs text-green-400">
                  ✓ Match!
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center mt-6">
              Powered by <span className="text-blue-400 font-semibold">Zama's FHEVM v0.9</span> on Ethereum Sepolia
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16">
            Why This Changes Everything
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">For Employers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Competitive Advantage</div>
                    <div className="text-gray-400 text-sm">Budget strategies remain confidential from competitors</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Faster Filtering</div>
                    <div className="text-gray-400 text-sm">Instantly filter misaligned candidates without awkward conversations</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Pay Equity Protection</div>
                    <div className="text-gray-400 text-sm">Prevent internal comparisons that complicate HR policies</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Compliance-Ready</div>
                    <div className="text-gray-400 text-sm">Align with emerging salary transparency laws (EU, NYC, CA)</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">For Candidates</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Negotiation Power</div>
                    <div className="text-gray-400 text-sm">Never reveal your bottom line prematurely</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Time Savings</div>
                    <div className="text-gray-400 text-sm">Skip 3-5 interview rounds with misaligned employers</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Fair Compensation</div>
                    <div className="text-gray-400 text-sm">Break the cycle of salary history anchoring</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold mb-1">Privacy Control</div>
                    <div className="text-gray-400 text-sm">Your expectations are yours alone—cryptographically guaranteed</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16">
            Building the Future
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-900/40 to-green-800/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 flex items-start">
              <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">✅ Phase 1: MVP (Current)</h3>
                <p className="text-gray-300">FHEVM v0.9 integration, basic salary matching, Sepolia testnet deployment</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 flex items-start">
              <div className="w-6 h-6 bg-purple-500 rounded-full mr-4 flex-shrink-0 mt-1 flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🔜 Phase 2: Advanced Matching (Q2 2024)</h3>
                <p className="text-gray-300">Multi-factor matching (skills, experience, benefits), batch processing, mainnet launch</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 flex items-start">
              <div className="w-6 h-6 bg-blue-500 rounded-full mr-4 flex-shrink-0 mt-1 flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🚀 Phase 3: Marketplace (Q4 2024)</h3>
                <p className="text-gray-300">Two-sided marketplace, recruiter tools, company verification, tokenomics</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/40 to-cyan-800/20 backdrop-blur-sm p-6 rounded-xl border border-pink-500/30 flex items-start">
              <div className="w-6 h-6 bg-pink-500 rounded-full mr-4 flex-shrink-0 mt-1 flex items-center justify-center text-white font-bold text-sm">4</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🌍 Phase 4: Global Scale (2025)</h3>
                <p className="text-gray-300">Multi-chain support, API for ATS integration, enterprise licensing, regulatory compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/50 via-cyan-900/50 to-blue-900/50 backdrop-blur-sm p-12 rounded-3xl border border-blue-500/30">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Hire in Stealth Mode?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the future of privacy-preserving recruitment. Try our demo with pre-loaded candidates.
            </p>
            <Link 
              href="/dapp"
              className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Launch HushHire App →
            </Link>
            <p className="text-gray-400 text-sm mt-6">
              No registration required • Connect wallet to start • Sepolia testnet
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HushHire</span>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p className="mb-2">Built with FHEVM v0.9 by Zama</p>
              <p>© 2024 HushHire. Privacy-first recruitment for the Web3 era.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
