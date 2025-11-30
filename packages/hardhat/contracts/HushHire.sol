// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title HushHire
 * @notice Privacy-first recruitment platform using FHE for confidential salary matching
 * @dev Employers can make encrypted offers and candidates' salary expectations remain private
 */
contract HushHire is ZamaEthereumConfig {
    // Candidate structure (stored as plain data for simplicity)
    struct Candidate {
        string name;
        string position;
        uint32 expectedSalary; // In USD per month
        string skills;
        bool isActive;
    }

    // Mapping: employer address => candidate ID => encrypted offer result
    mapping(address => mapping(uint256 => euint32)) public offerResults;
    
    // Mapping: employer address => candidate ID => has made offer
    mapping(address => mapping(uint256 => bool)) public hasOffered;
    
    // Mapping: employer address => candidate ID => offer timestamp
    mapping(address => mapping(uint256 => uint256)) public offerTimestamp;

    // Array of candidates (hardcoded for demo)
    Candidate[] public candidates;

    // Events
    event OfferSubmitted(address indexed employer, uint256 indexed candidateId, uint256 timestamp);
    event CandidatesInitialized(uint256 count);

    constructor() {
        // Initialize demo candidates with realistic data
        candidates.push(Candidate({
            name: "Alice Chen",
            position: "Senior Full-Stack Developer",
            expectedSalary: 8000,
            skills: "React, Node.js, PostgreSQL, AWS",
            isActive: true
        }));

        candidates.push(Candidate({
            name: "Bob Martinez",
            position: "DevOps Engineer",
            expectedSalary: 7500,
            skills: "Kubernetes, Docker, CI/CD, Terraform",
            isActive: true
        }));

        candidates.push(Candidate({
            name: "Carol Wang",
            position: "Product Designer",
            expectedSalary: 6500,
            skills: "Figma, User Research, Prototyping, UI/UX",
            isActive: true
        }));

        candidates.push(Candidate({
            name: "David Kim",
            position: "Machine Learning Engineer",
            expectedSalary: 9500,
            skills: "Python, TensorFlow, PyTorch, NLP",
            isActive: true
        }));

        candidates.push(Candidate({
            name: "Emma Johnson",
            position: "Frontend Developer",
            expectedSalary: 7000,
            skills: "Vue.js, TypeScript, Tailwind CSS, GraphQL",
            isActive: true
        }));

        emit CandidatesInitialized(candidates.length);
    }

    /**
     * @notice Submit an encrypted salary offer for a candidate
     * @dev The offer is compared with candidate's expected salary using FHE
     * @param candidateId The ID of the candidate (0-based index)
     * @param encryptedOffer Encrypted offer amount from employer
     * @param proof Zero-knowledge proof for the encrypted input
     */
    function submitOffer(
        uint256 candidateId,
        externalEuint32 encryptedOffer,
        bytes calldata proof
    ) external {
        require(candidateId < candidates.length, "Invalid candidate ID");
        require(candidates[candidateId].isActive, "Candidate is not active");

        // Convert external encrypted input to internal encrypted type
        euint32 offer = FHE.fromExternal(encryptedOffer, proof);

        // Get candidate's expected salary and encrypt it
        euint32 expectedSalary = FHE.asEuint32(candidates[candidateId].expectedSalary);

        // Compare: offer >= expectedSalary (returns encrypted boolean)
        ebool isMatch = FHE.ge(offer, expectedSalary);

        // Convert boolean result to uint32 (1 for match, 0 for no match)
        euint32 one = FHE.asEuint32(uint32(1));
        euint32 zero = FHE.asEuint32(uint32(0));
        euint32 result = FHE.select(isMatch, one, zero);

        // Store the encrypted result
        offerResults[msg.sender][candidateId] = result;
        hasOffered[msg.sender][candidateId] = true;
        offerTimestamp[msg.sender][candidateId] = block.timestamp;

        // Grant access permissions
        FHE.allowThis(result);           // Contract can access the result
        FHE.allow(result, msg.sender);   // Employer can decrypt the result

        emit OfferSubmitted(msg.sender, candidateId, block.timestamp);
    }

    /**
     * @notice Get the encrypted result of an offer
     * @dev Must be called by the employer who made the offer
     * @param candidateId The ID of the candidate
     * @return The encrypted result handle (bytes32)
     */
    function getOfferResult(uint256 candidateId) external view returns (bytes32) {
        require(hasOffered[msg.sender][candidateId], "No offer found for this candidate");
        return FHE.toBytes32(offerResults[msg.sender][candidateId]);
    }

    /**
     * @notice Get the total number of candidates
     * @return The number of candidates in the system
     */
    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }

    /**
     * @notice Get candidate information (non-sensitive data only)
     * @param candidateId The ID of the candidate
     * @return Candidate struct with public information
     */
    function getCandidate(uint256 candidateId) external view returns (Candidate memory) {
        require(candidateId < candidates.length, "Invalid candidate ID");
        return candidates[candidateId];
    }

    /**
     * @notice Check if an employer has made an offer to a candidate
     * @param employer The address of the employer
     * @param candidateId The ID of the candidate
     * @return True if an offer has been made
     */
    function hasEmployerOffered(address employer, uint256 candidateId) external view returns (bool) {
        return hasOffered[employer][candidateId];
    }

    /**
     * @notice Get the timestamp of an offer
     * @param employer The address of the employer
     * @param candidateId The ID of the candidate
     * @return The timestamp when the offer was made
     */
    function getOfferTimestamp(address employer, uint256 candidateId) external view returns (uint256) {
        require(hasOffered[employer][candidateId], "No offer found");
        return offerTimestamp[employer][candidateId];
    }
}

