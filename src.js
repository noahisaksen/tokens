import { encode, decode } from 'gpt-tokenizer';

const inputText = document.getElementById('input-text');
const tokensContainer = document.getElementById('tokens-container');
const tokenCount = document.getElementById('token-count');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');

function getColorForIndex(index) {
    // Generate color based on token position/index
    // Use golden ratio for better color distribution
    const goldenRatio = 0.618033988749895;
    const hue = (index * goldenRatio * 360) % 360;
    const saturation = 60 + ((index * 17) % 25); // 60-85%
    const lightness = 80 + ((index * 13) % 12); // 80-92% for light backgrounds

    const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const borderColor = `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`;
    const textColor = `hsl(${hue}, ${saturation + 15}%, ${lightness - 60}%)`;

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
            .map((token, index) => {
                const { bgColor, borderColor, textColor } = getColorForIndex(index);
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
