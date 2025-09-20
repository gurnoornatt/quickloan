# QuickLoan 🏠

**AI-Powered Mortgage Advisory Platform**

QuickLoan is an intelligent mortgage guidance system that combines artificial intelligence with comprehensive document processing to help borrowers navigate the complex world of home financing. Whether you're a first-time homebuyer or a seasoned investor, QuickLoan provides personalized advice and automated workflows to streamline your mortgage journey.

## ✨ What QuickLoan Does

### 🤖 Intelligent Mortgage Guidance
Ask questions in plain English and get instant, accurate answers about:
- Loan requirements and eligibility
- Down payment and LTV ratios
- Credit score requirements
- State-specific regulations
- Document requirements

### 📄 Smart Document Processing
Upload your financial documents and QuickLoan will:
- Automatically identify document types (W2s, bank statements, tax returns, etc.)
- Extract key financial data
- Validate information for accuracy
- Organize everything for your loan application

### 🔄 Personalized Workflows
Get customized step-by-step guidance based on your specific situation:
- **Conventional Loans** - Traditional financing options
- **FHA Loans** - Government-backed loans for first-time buyers
- **VA Loans** - Benefits for military veterans
- **Jumbo Loans** - High-value property financing
- **Alternative Financing** - Including crypto-backed loans

### 🧠 Advanced AI Features
- **Natural Language Processing** powered by GPT-4
- **Monte Carlo Tree Search** for optimal decision-making
- **Conflict Resolution** when guidelines differ between sources
- **Real-time Compliance** checking against current regulations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quickloan
   ```

2. **Set up the frontend**
   ```bash
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

3. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```
   The API will be available at `http://localhost:8000`

4. **Configure environment variables**

   Copy the example files and add your API keys:
   ```bash
   # Frontend
   cp .env.example .env.local

   # Backend
   cp backend/.env.example backend/.env
   ```

   You'll need:
   - **Supabase** account for database
   - **OpenAI API** key for AI features
   - **Addy AI API** key for document processing

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 with React 19
- TypeScript for type safety
- TailwindCSS for styling
- Radix UI components

**Backend**
- FastAPI (Python) for high-performance API
- Async architecture for scalability
- Comprehensive testing suite

**AI & Data**
- OpenAI GPT-4 for natural language processing
- Supabase (PostgreSQL) for data storage
- Addy AI for document classification
- Custom MCTS algorithm for decision optimization

## 📋 Features in Detail

### Chat Interface
- Conversational AI that understands mortgage terminology
- Context-aware responses based on your situation
- Ability to ask follow-up questions
- Integration with workflow generation

### Document Intelligence
- Supports 15+ document types
- Automatic classification with high accuracy
- Data extraction and validation
- Secure storage with audit trails

### Workflow Automation
- Dynamic workflow generation based on loan type
- State-specific requirement integration
- Progress tracking and completion status
- Conditional steps based on borrower profile

### Compliance Engine
- Real-time guideline checking
- Multi-source validation (Fannie Mae, Freddie Mac, FHA, VA)
- Conflict detection and resolution
- Audit logging for regulatory compliance

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest tests/ -v --cov=.

# Interactive testing
python test_real.py
```

### Code Quality
```bash
# Frontend linting
npm run lint

# Type checking
npm run build
```

## 🔐 Security & Privacy

- Environment-based configuration for sensitive data
- API key security and rotation
- Input validation and sanitization
- CORS protection for API endpoints
- Secure document handling and storage

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive technical documentation
- **[API Documentation](./backend/README.md)** - Backend API reference
- **Environment Setup** - See `.env.example` files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Need help? Here are your options:

- **Issues**: Report bugs or request features on GitHub
- **Documentation**: Check the comprehensive docs in CLAUDE.md
- **Community**: Join discussions in the Issues section

---

**Built with ❤️ for homebuyers and mortgage professionals**

*QuickLoan makes mortgage guidance accessible, accurate, and automated.*