# GPT Text Tokenizer

A clean, minimalistic web application that tokenizes text using GPT's tokenization algorithm (cl100k_base encoding). All tokenization happens client-side in the browser - no server calls required!

## Features

### Text Tokenizer
- Real-time GPT tokenization using BPE (Byte Pair Encoding)
- Client-side processing - all tokenization runs in your browser
- Beautiful, colorful token visualization with unique colors per token position
- Live statistics: token count, character count, and word count
- Clean, minimalistic UI

### Format Comparison Tool
- Compare token usage across different data formats
- Converts CSV to JSON, Markdown Table, and TOML
- Visual bar chart comparing token counts
- See which format is most token-efficient for your data
- All processing happens client-side

## Prerequisites

- [Bun](https://bun.sh/) - A fast JavaScript runtime

## Getting Started

### 1. Install Dependencies

```bash
make install
```

This installs the `gpt-tokenizer` package and other dependencies.

### 2. Build the Bundle

```bash
make build
```

This bundles the client-side JavaScript (including the GPT tokenizer) into `bundle.js`. The bundle is ~2.2MB and contains all the tokenization logic.

### 3. Start the Development Server

```bash
make dev
```

This builds the bundle and starts a local server at `http://localhost:3000`.

Open your browser and navigate to `http://localhost:3000` to use the tokenizer!

## Pages

- **`/`** - Text Tokenizer: Visualize how text gets tokenized
- **`/compare.html`** - Format Comparison: Compare token usage across CSV, JSON, Markdown, and TOML formats

## Development Workflow

### First Time Setup

```bash
make install    # Install dependencies
make dev        # Build and start server
```

### After Making Changes

If you modify `src.js` or `compare.js`:

```bash
make build      # Rebuild both bundles
```

The server will automatically serve the new bundles on refresh.

### Full Rebuild

```bash
make rebuild    # Clean old files and rebuild
```

## Project Structure

```
.
├── index.html          # Text tokenizer page
├── src.js              # Source JavaScript for tokenizer
├── bundle.js           # Built tokenizer bundle (generated)
├── compare.html        # Format comparison page
├── compare.js          # Source JavaScript for comparison tool
├── compare-bundle.js   # Built comparison bundle (generated)
├── server.ts           # Bun server to serve the application
├── Makefile            # Build and development commands
└── README.md           # This file
```

## How It Works

### Text Tokenizer
1. **Client-Side Tokenization**: The entire GPT tokenizer (~2.2MB) is bundled into `bundle.js` using Bun's bundler
2. **No Server Calls**: All tokenization happens in JavaScript in your browser
3. **Color Generation**: Each token position gets a consistent color using the golden ratio for even distribution
4. **Real-Time Updates**: As you type, tokens are generated instantly

### Format Comparison
1. **CSV Parsing**: Uses PapaParse to parse CSV data in the browser
2. **Format Conversion**: Converts parsed data to JSON, Markdown table, and TOML formats
3. **Token Counting**: Each format is tokenized using GPT's tokenizer to count tokens
4. **Visual Comparison**: Bar chart displays relative token usage across formats

## Available Commands

Run `make help` to see all available commands:

```bash
make help       # Show available commands
make install    # Install dependencies
make build      # Build the JavaScript bundle
make dev        # Build and start the development server
make clean      # Remove built files
make rebuild    # Clean and rebuild the bundle
```

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Technologies Used

- [Bun](https://bun.sh/) - JavaScript runtime and bundler
- [gpt-tokenizer](https://www.npmjs.com/package/gpt-tokenizer) - GPT tokenization library (cl100k_base encoding)
- [PapaParse](https://www.papaparse.com/) - Fast CSV parser for the browser
- Vanilla JavaScript - No frameworks needed!
- HTML/CSS - Clean, modern UI

## License

MIT
