import { encode, decode } from 'gpt-tokenizer';

const inputText = document.getElementById('input-text');
const tokensContainer = document.getElementById('tokens-container');
const tokenCount = document.getElementById('token-count');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');

function getColorForTokenId(tokenId) {
    // Use token ID directly for color generation (consistent colors)
    const hash = Math.abs(tokenId);

    // Generate vibrant colors using HSL
    const hue = hash % 360;
    const saturation = 65 + (hash % 20); // 65-85%
    const lightness = 85 + (hash % 10); // 85-95% for light backgrounds

    const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const borderColor = `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`;
    const textColor = `hsl(${hue}, ${saturation + 10}%, ${lightness - 55}%)`;

    return { bgColor, borderColor, textColor };
}

function tokenize(text) {
    if (!text.trim()) return [];

    // Use GPT tokenizer (cl100k_base encoding)
    const tokenIds = encode(text);

    // Return both token IDs and decoded text
    return tokenIds.map(id => ({
        id,
        text: decode([id])
    }));
}

function updateTokens() {
    const text = inputText.value;
    const tokens = tokenize(text);

    // Update character count
    charCount.textContent = text.length;

    // Update word count (words only, not punctuation)
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words;

    // Update token count and display
    tokenCount.textContent = tokens.length;

    if (tokens.length === 0) {
        tokensContainer.innerHTML = '<div class="empty-state">Tokens will appear here...</div>';
    } else {
        tokensContainer.innerHTML = tokens
            .map(token => {
                const { bgColor, borderColor, textColor } = getColorForTokenId(token.id);
                return `<span class="token" style="background-color: ${bgColor}; border: 1px solid ${borderColor}; color: ${textColor};">${escapeHtml(token.text)}</span>`;
            })
            .join('');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update tokens on input
inputText.addEventListener('input', updateTokens);

// Initialize
updateTokens();
