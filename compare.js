import Papa from 'papaparse';
import { encode, decode } from 'gpt-tokenizer';

const dataInput = document.getElementById('csv-input');
const resultsGrid = document.getElementById('results-grid');
const chartSection = document.getElementById('chart-section');
const barChart = document.getElementById('bar-chart');

function getColorForIndex(index) {
    const goldenRatio = 0.618033988749895;
    const hue = (index * goldenRatio * 360) % 360;
    const saturation = 60 + ((index * 17) % 25);
    const lightness = 80 + ((index * 13) % 12);

    const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const borderColor = `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`;
    const textColor = `hsl(${hue}, ${saturation + 15}%, ${lightness - 60}%)`;

    return { bgColor, borderColor, textColor };
}

function tokenizeText(text) {
    if (!text.trim()) return [];
    const tokenIds = encode(text);
    return tokenIds.map(id => ({
        id,
        text: decode([id])
    }));
}

function colorizeText(text) {
    const tokens = tokenizeText(text);
    return tokens.map((token, index) => {
        const { bgColor, borderColor, textColor } = getColorForIndex(index);
        const escaped = escapeHtml(token.text);
        return `<span class="token" style="background-color: ${bgColor}; border: 1px solid ${borderColor}; color: ${textColor};">${escaped}</span>`;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format detection
function detectFormat(text) {
    text = text.trim();

    // Try JSON
    try {
        JSON.parse(text);
        return 'json';
    } catch (e) {}

    // Check for TOML (simple heuristic)
    if (text.includes('[[') && text.includes(']]') || text.includes(' = ')) {
        return 'toml';
    }

    // Check for Markdown table
    if (text.includes('|') && text.includes('---')) {
        return 'markdown';
    }

    // Default to CSV
    return 'csv';
}

// Parse functions
function parseCSV(text) {
    const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true
    });

    if (result.errors.length > 0 || result.data.length === 0) {
        return null;
    }

    return result.data;
}

function parseJSON(text) {
    try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
            return data;
        }
        return [data];
    } catch (e) {
        return null;
    }
}

function parseMarkdownTable(text) {
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 3) return null;

    // Parse header
    const headerLine = lines[0];
    const headers = headerLine.split('|')
        .map(h => h.trim())
        .filter(h => h);

    // Skip separator line (line 1)

    // Parse data rows
    const data = [];
    for (let i = 2; i < lines.length; i++) {
        const cells = lines[i].split('|')
            .map(c => c.trim())
            .filter(c => c !== '');

        if (cells.length === headers.length) {
            const row = {};
            headers.forEach((h, idx) => {
                row[h] = cells[idx];
            });
            data.push(row);
        }
    }

    return data.length > 0 ? data : null;
}

function parseTOML(text) {
    // Simple TOML parser for [[records]] format
    const data = [];
    const blocks = text.split('[[records]]').filter(b => b.trim());

    for (const block of blocks) {
        const lines = block.trim().split('\n');
        const row = {};

        for (const line of lines) {
            const match = line.match(/^(\w+)\s*=\s*(.+)$/);
            if (match) {
                const key = match[1];
                let value = match[2].trim();

                // Remove quotes
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }

                row[key] = value;
            }
        }

        if (Object.keys(row).length > 0) {
            data.push(row);
        }
    }

    return data.length > 0 ? data : null;
}

// Convert functions
function dataToCSV(data) {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
        csv += headers.map(h => row[h] || '').join(',') + '\n';
    });

    return csv.trim();
}

function dataToJSON(data) {
    return JSON.stringify(data, null, 2);
}

function dataToMarkdown(data) {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    let markdown = '| ' + headers.join(' | ') + ' |\n';
    markdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

    data.forEach(row => {
        markdown += '| ' + headers.map(h => row[h] || '').join(' | ') + ' |\n';
    });

    return markdown.trim();
}

function dataToTOML(data) {
    if (!data || data.length === 0) return '';

    let toml = '';
    data.forEach((row, index) => {
        toml += `[[records]]\n`;
        Object.entries(row).forEach(([key, value]) => {
            if (isNaN(value)) {
                toml += `${key} = "${value}"\n`;
            } else {
                toml += `${key} = ${value}\n`;
            }
        });
        if (index < data.length - 1) toml += '\n';
    });

    return toml.trim();
}

function countTokens(text) {
    return encode(text).length;
}

function createFormatCard(title, content, tokenCount) {
    const colorizedContent = colorizeText(content);
    return `
        <div class="format-card">
            <div class="format-header">
                <span class="format-title">${title}</span>
                <span class="token-badge">${tokenCount} tokens</span>
            </div>
            <div class="format-content">
                <pre>${colorizedContent}</pre>
            </div>
        </div>
    `;
}

function updateComparison() {
    const inputText = dataInput.value.trim();

    if (!inputText) {
        resultsGrid.innerHTML = '<div class="empty-state">Paste data above to see format comparisons...</div>';
        chartSection.style.display = 'none';
        return;
    }

    // Detect and parse input
    const format = detectFormat(inputText);
    let data = null;

    switch (format) {
        case 'json':
            data = parseJSON(inputText);
            break;
        case 'toml':
            data = parseTOML(inputText);
            break;
        case 'markdown':
            data = parseMarkdownTable(inputText);
            break;
        case 'csv':
        default:
            data = parseCSV(inputText);
            break;
    }

    if (!data) {
        resultsGrid.innerHTML = '<div class="empty-state">Could not parse input. Please check your data format.</div>';
        chartSection.style.display = 'none';
        return;
    }

    // Generate all formats
    const formats = [
        { name: 'CSV', content: dataToCSV(data) },
        { name: 'JSON', content: dataToJSON(data) },
        { name: 'Markdown Table', content: dataToMarkdown(data) },
        { name: 'TOML', content: dataToTOML(data) }
    ];

    // Calculate tokens
    const results = formats.map(format => ({
        ...format,
        tokens: countTokens(format.content)
    }));

    // Display format cards
    resultsGrid.innerHTML = results
        .map(result => createFormatCard(result.name, result.content, result.tokens))
        .join('');

    // Display chart
    displayChart(results);
}

function displayChart(results) {
    chartSection.style.display = 'block';

    // Sort by token count (least to most)
    const sortedResults = [...results].sort((a, b) => a.tokens - b.tokens);
    const maxTokens = Math.max(...results.map(r => r.tokens));

    barChart.innerHTML = sortedResults.map((result, index) => {
        const widthPercent = (result.tokens / maxTokens) * 100;
        const rank = index + 1;
        return `
            <div class="bar-row">
                <div class="bar-label">${rank}. ${result.name}</div>
                <div class="bar-container">
                    <div class="bar" style="width: ${widthPercent}%"></div>
                    <div class="bar-value">${result.tokens} tokens</div>
                </div>
            </div>
        `;
    }).join('');
}

// Update on input
dataInput.addEventListener('input', updateComparison);

// Initialize
updateComparison();
