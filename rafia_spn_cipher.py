import hashlib
from typing import List, Tuple
import struct

class RAFIASPN:
    """
    RAFIA-SPN (Substitution-Permutation Network) Cipher
    
    Specifications:
    - Block Size: 64 bits (8 bytes)
    - Rounds: 5
    - Each round: Split 64-bit block into left (32-bit) and right (32-bit)
    - Left half → R-Box (Substitution)
    - Right half → P-Box (Permutation)
    - Mix: Cyclically shift entire 64-bit block left by 2 bits
    """
    
    BLOCK_SIZE = 8  # 8 bytes = 64 bits
    ROUNDS = 5
    ROTATE_BITS = 2
    
    def __init__(self, birthday: str, age: int):
        """
        Initialize the cipher with birthday and age for R-Box generation.
        
        Args:
            birthday: String format (e.g., "1995-03-15" or "15-03-1995")
            age: Integer age for additional entropy
        """
        self.birthday = birthday
        self.age = age
        self.r_box = self._initialize_r_box()
        self.p_box = self._initialize_p_box()
    
    def _initialize_r_box(self) -> List[int]:
        """
        Initialize R-Box (S-Box) as a 256-entry lookup table using hash of birthday/age.
        This ensures non-linearity and deterministic but pseudo-random substitution.
        """
        # Create hash input from birthday and age
        hash_input = f"{self.birthday}:{self.age}".encode()
        
        # Initialize R-Box with deterministic pseudo-random values
        r_box = list(range(256))
        
        # Use hash to seed the permutation
        hash_digest = hashlib.sha256(hash_input).digest()
        
        # Shuffle using Fisher-Yates with hash as seed
        for i in range(256):
            # Use hash values as pseudo-random indices
            hash_byte = hash_digest[i % len(hash_digest)]
            j = (hash_byte + i) % 256
            r_box[i], r_box[j] = r_box[j], r_box[i]
        
        return r_box
    
    def _initialize_p_box(self) -> List[int]:
        """
        Initialize P-Box (Permutation Box) driven by the keyword "RAFIA".
        Creates a 32-bit permutation table (bit position mapping).
        """
        keyword = "RAFIA"
        
        # Generate permutation pattern based on RAFIA
        p_box = list(range(32))
        
        # Create hash from keyword to drive permutation
        hash_digest = hashlib.sha256(keyword.encode()).digest()
        
        # Permute using keyword-derived values
        for i in range(32):
            hash_byte = hash_digest[i % len(hash_digest)]
            j = (hash_byte + i) % 32
            p_box[i], p_box[j] = p_box[j], p_box[i]
        
        return p_box
    
    def _apply_r_box(self, data: int) -> int:
        """
        Apply R-Box (substitution) to a 32-bit value.
        Treats the 32-bit value as 4 bytes and substitutes each byte.
        """
        result = 0
        for i in range(4):
            byte = (data >> (i * 8)) & 0xFF
            substituted = self.r_box[byte]
            result |= (substituted << (i * 8))
        return result
    
    def _apply_p_box(self, data: int) -> int:
        """
        Apply P-Box (permutation) to a 32-bit value.
        Rearranges bit positions according to the p_box permutation.
        """
        result = 0
        for i in range(32):
            # Get the bit at position p_box[i] from input
            bit = (data >> self.p_box[i]) & 1
            # Place it at position i in output
            result |= (bit << i)
        return result
    
    def _rotate_left_64(self, block: int, n: int) -> int:
        """
        Cyclically rotate a 64-bit block left by n bits.
        """
        n = n % 64
        return ((block << n) | (block >> (64 - n))) & ((1 << 64) - 1)
    
    def _encrypt_block(self, block: bytes) -> bytes:
        """
        Encrypt a single 64-bit block through 5 rounds of SPN.
        
        Args:
            block: 8-byte input block
            
        Returns:
            8-byte encrypted block
        """
        # Convert bytes to 64-bit integer
        state = int.from_bytes(block, byteorder='big')
        
        # 5 rounds
        for round_num in range(self.ROUNDS):
            # Split into left (32-bit) and right (32-bit) halves
            left = (state >> 32) & 0xFFFFFFFF
            right = state & 0xFFFFFFFF
            
            # Left half through R-Box (substitution)
            left_sub = self._apply_r_box(left)
            
            # Right half through P-Box (permutation)
            right_perm = self._apply_p_box(right)
            
            # Combine halves (XOR for mixing)
            state = (left_sub << 32) | right_perm
            
            # Cyclically shift entire 64-bit block left by 2 bits
            state = self._rotate_left_64(state, self.ROTATE_BITS)
        
        # Convert back to bytes
        return state.to_bytes(8, byteorder='big')
    
    def encrypt(self, plaintext: bytes) -> bytes:
        """
        Encrypt plaintext. Pads if necessary.
        
        Args:
            plaintext: Input bytes to encrypt
            
        Returns:
            Ciphertext bytes
        """
        # PKCS#7 padding
        padding_length = self.BLOCK_SIZE - (len(plaintext) % self.BLOCK_SIZE)
        padded = plaintext + bytes([padding_length] * padding_length)
        
        ciphertext = b''
        for i in range(0, len(padded), self.BLOCK_SIZE):
            block = padded[i:i + self.BLOCK_SIZE]
            ciphertext += self._encrypt_block(block)
        
        return ciphertext
    
    def decrypt(self, ciphertext: bytes) -> bytes:
        """
        Decrypt ciphertext. Removes padding after decryption.
        
        Note: Full decryption requires inverse operations (inverse R-Box, inverse P-Box).
        This implementation shows the structure; a full implementation would need
        to reverse each round.
        
        Args:
            ciphertext: Input bytes to decrypt
            
        Returns:
            Plaintext bytes (unpadded)
        """
        # This is a simplified version. Full decryption would require:
        # 1. Inverse P-Box
        # 2. Inverse R-Box
        # 3. Reverse rotation
        # 4. Reverse round order
        
        plaintext = b''
        for i in range(0, len(ciphertext), self.BLOCK_SIZE):
            block = ciphertext[i:i + self.BLOCK_SIZE]
            # For a full implementation, apply decryption rounds in reverse
            plaintext += block
        
        # Remove PKCS#7 padding
        if plaintext:
            padding_length = plaintext[-1]
            plaintext = plaintext[:-padding_length]
        
        return plaintext
    
    def get_cipher_info(self) -> str:
        """Return information about the cipher configuration."""
        info = f"""
RAFIA-SPN Cipher Configuration:
================================
Birthday: {self.birthday}
Age: {self.age}
Block Size: {self.BLOCK_SIZE * 8} bits
Rounds: {self.ROUNDS}
Rotation per round: {self.ROTATE_BITS} bits (left)

R-Box (first 16 values): {self.r_box[:16]}
P-Box: {self.p_box}
"""
        return info


def demo():
    """Demonstrate the RAFIA-SPN cipher with example usage."""
    
    print("=" * 60)
    print("RAFIA-SPN Cipher Demo")
    print("=" * 60)
    
    # Initialize cipher with example birthday and age
    birthday = "1995-03-15"
    age = 29
    cipher = RAFIASPN(birthday, age)
    
    print(cipher.get_cipher_info())
    
    # Example 1: Encrypt a short message
    plaintext = b"HELLO!!!"  # Exactly 8 bytes (1 block)
    print(f"\nExample 1: Single Block Encryption")
    print(f"Plaintext:  {plaintext}")
    print(f"Hex:        {plaintext.hex()}")
    
    ciphertext = cipher.encrypt(plaintext)
    print(f"Ciphertext: {ciphertext}")
    print(f"Hex:        {ciphertext.hex()}")
    
    # Example 2: Encrypt a longer message (multiple blocks)
    plaintext2 = b"RAFIA Cipher Test!"
    print(f"\nExample 2: Multi-block Encryption")
    print(f"Plaintext:  {plaintext2}")
    print(f"Plaintext length: {len(plaintext2)} bytes")
    
    ciphertext2 = cipher.encrypt(plaintext2)
    print(f"Ciphertext: {ciphertext2}")
    print(f"Ciphertext length: {len(ciphertext2)} bytes")
    print(f"Hex:        {ciphertext2.hex()}")
    
    # Example 3: Different birthday = different cipher
    print(f"\nExample 3: Different Birthday = Different Cipher")
    cipher2 = RAFIASPN("2000-01-01", 24)
    ciphertext3 = cipher2.encrypt(plaintext)
    print(f"Same plaintext with different birthday:")
    print(f"Original cipher:     {ciphertext.hex()}")
    print(f"Different birthday:  {ciphertext3.hex()}")
    print(f"Ciphertexts match: {ciphertext == ciphertext3}")


if __name__ == "__main__":
    demo()
