# QuickLoan - AI-Powered Mortgage Advisory Platform

## Project Overview

QuickLoan is a sophisticated full-stack mortgage advisory application that combines AI-powered natural language processing with comprehensive mortgage document processing and workflow generation. The platform serves as an intelligent assistant for mortgage professionals and borrowers, providing accurate guidance on mortgage guidelines, requirements, and processes.

### Core Purpose
- **AI-Powered Consultation**: Natural language chat interface for mortgage guidance
- **Document Intelligence**: Automated document classification and data extraction
- **Workflow Automation**: Dynamic generation of mortgage application workflows
- **Regulatory Compliance**: Real-time access to current mortgage guidelines and requirements
- **Decision Support**: Advanced conflict resolution using Monte Carlo Tree Search (MCTS)

## System Architecture

### Technology Stack

**Frontend (Next.js 15.1.6)**
- React 19 with TypeScript
- TailwindCSS for styling
- Radix UI components library
- React Hook Form with Zod validation
- Lucide React icons

**Backend (Python FastAPI)**
- FastAPI framework for REST API
- Python 3.11+ with type hints
- Async/await architecture
- CORS middleware for cross-origin requests

**Databases & Storage**
- Supabase (PostgreSQL) for structured data
- Real-time subscriptions and authentication

**AI & ML Services**
- OpenAI GPT-4 for natural language processing
- Addy AI API for document classification and extraction
- Custom MCTS implementation for decision optimization

**Development Tools**
- ESLint and TypeScript for code quality
- pytest for Python testing
- Virtual environment management

### Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js UI   │◄──►│   FastAPI       │◄──►│   Supabase      │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         │              │   OpenAI GPT-4  │              │
         │              └─────────────────┘              │
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Addy AI API   │◄─────────────┘
                        └─────────────────┘
```

## Core Features

### 1. AI-Powered Chat Interface (`/components/chat.tsx`)
- Real-time conversational interface with mortgage AI advisor
- Supports complex queries about mortgage guidelines, requirements, and processes
- Contextual responses based on user conversation history
- Integration with workflow generation for actionable recommendations
- Feedback mechanism with thumbs up/down rating system

### 2. Natural Language Processing Engine (`/backend/loanFlash/nlp_engine.py`)

**Intent Detection**
- LTV (Loan-to-Value) inquiries
- DTI (Debt-to-Income) ratio questions
- Credit score requirements
- State-specific regulations
- Property type variations
- Document requirements

**Entity Extraction**
- Geographic locations (states, cities)
- Property types (single-family, multi-family, condo, townhouse)
- Loan types (FHA, VA, USDA, conventional, jumbo, crypto-backed)
- Financial metrics and thresholds

**Response Generation**
- GPT-4 powered contextual responses
- Confidence scoring for answer reliability
- Guideline-backed recommendations
- Error handling and fallback responses

### 3. Document Processing System (`/backend/loanFlash/document_processor.py`)

**Supported Document Types**
- Income documents: W2, 1099, PayStubs, Tax Returns
- Asset documents: Bank Statements, Investment Accounts, Retirement Statements
- Property documents: Mortgage Statements, HOA Statements, Insurance Declarations
- Identity documents: Government ID, VA Certificates, Work Visas

**Processing Pipeline**
1. **Classification**: Automatic document type identification via Addy AI
2. **Data Extraction**: Structured data extraction from documents
3. **Validation**: Data integrity checks and error handling
4. **Storage**: Secure storage in Supabase with metadata

### 4. Workflow Generation (`/backend/loanFlash/workflow_generator.py`)

**Mortgage Scenarios Supported**
- Conventional loans
- FHA loans
- VA loans
- USDA rural development loans
- Jumbo loans
- Crypto-backed loans
- Self-employed borrowers
- Multi-property investments

**Dynamic Workflow Features**
- Conditional step inclusion based on borrower profile
- State-specific requirements integration
- Real-time compliance checking
- Progress tracking and completion status
- Document requirement automation

### 5. Advanced Conflict Resolution (`/backend/loanFlash/mcts.py`)

**Monte Carlo Tree Search Implementation**
- Intelligent guideline conflict detection
- Multi-criteria decision optimization
- Risk assessment and compliance scoring
- Automated resolution recommendations
- Learning from previous decisions

## API Structure

### Core Endpoints

**Chat Interface**
```
POST /api/chat
- Process natural language queries
- Generate AI-powered responses
- Trigger workflow creation when applicable
- Store conversation context
```

**Document Processing**
```
POST /api/document/process
- Upload and process mortgage documents
- Automatic classification and data extraction
- Support for multiple file formats
- Batch processing capabilities
```

**Workflow Management**
```
POST /api/workflow/create
- Generate custom mortgage workflows
- Apply borrower-specific conditions
- Include state and loan-type requirements
- Real-time compliance validation
```

**Health Monitoring**
```
GET /health
- System health status
- Component availability checks
- Performance metrics
- Error reporting
```

### Data Flow

1. **User Query** → Chat Interface → NLP Engine
2. **Intent Detection** → Entity Extraction → Guideline Search
3. **AI Processing** → Response Generation → Workflow Trigger
4. **Document Upload** → Classification → Data Extraction → Knowledge Base
5. **Workflow Request** → Template Selection → Customization → Validation

## Database Schema

### Core Tables (Supabase)

**borrowers**
```sql
CREATE TABLE borrowers (
    id UUID PRIMARY KEY,
    income NUMERIC,
    credit_score INTEGER,
    debt NUMERIC,
    property_value NUMERIC,
    extracted_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**guidelines**
```sql
CREATE TABLE guidelines (
    id UUID PRIMARY KEY,
    rule_name TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    source TEXT,
    category TEXT,
    state TEXT,
    version_hash TEXT,
    last_updated TIMESTAMP DEFAULT NOW(),
    matrix_data JSONB
);
```

**loan_decisions**
```sql
CREATE TABLE loan_decisions (
    id UUID PRIMARY KEY,
    borrower_id UUID REFERENCES borrowers(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    confidence_score FLOAT,
    decision_date TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);
```

**workflows**
```sql
CREATE TABLE workflows (
    id UUID PRIMARY KEY,
    scenario TEXT NOT NULL,
    title TEXT NOT NULL,
    steps JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    state_specific TEXT,
    version TEXT DEFAULT '1.0'
);
```

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Supabase account and project
- OpenAI API key
- Addy AI API key

### Environment Configuration

**Frontend (`.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend (`/backend/.env`)**
```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
ADDY_API_KEY=your-addy-api-key
FLASK_DEBUG=False
```

### Installation & Running

**Frontend Setup**
```bash
npm install
npm run dev  # Development server on http://localhost:3000
npm run build  # Production build
npm run start  # Production server
```

**Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py  # FastAPI server on http://localhost:8000
```

### Testing

**Python Backend Tests**
```bash
cd backend
python -m pytest tests/ -v --cov=.
python test_real.py  # Interactive testing
python run_system_tests.py  # System integration tests
```

**Frontend Testing**
```bash
npm run lint  # ESLint code quality checks
```

## AI/ML Implementation Details

### OpenAI Integration
- **Model**: GPT-4 for enhanced reasoning capabilities
- **Temperature**: 0.2 for consistent, factual responses
- **Max Tokens**: 500 for comprehensive yet concise answers
- **Context Management**: Conversation history and guideline context
- **Error Handling**: Graceful fallbacks and retry logic

### MCTS Algorithm
- **Search Space**: Mortgage guideline conflict resolution
- **Evaluation Function**: Multi-criteria scoring (compliance, risk, consistency)
- **Exploration Strategy**: UCB1 (Upper Confidence Bound)
- **Parallelization**: ThreadPoolExecutor for performance
- **State Management**: Conflict resolution tracking

### Document AI Pipeline
- **Pre-processing**: Base64 encoding, format validation
- **Classification**: Addy AI document type identification
- **Extraction**: Structured data parsing and validation
- **Post-processing**: Data normalization and storage

## Key Implementation Features

### Conflict Resolution System
The application implements sophisticated conflict detection and resolution:

1. **Similarity Detection**: TF-IDF vectorization and cosine similarity
2. **Value Extraction**: Regex-based numeric value identification
3. **Decision Tree**: MCTS-based optimal resolution selection
4. **Learning**: Historical decision pattern recognition

### State-Specific Guidelines
- Dynamic loading of state-specific mortgage requirements
- Automatic compliance checking against local regulations
- Multi-jurisdictional support for interstate transactions
- Real-time guideline updates and version control

### Workflow Customization Engine
- Template-based workflow generation
- Conditional logic for step inclusion/exclusion
- User input validation and sanitization
- Progress tracking and completion management

## Security & Compliance

### Data Protection
- Environment variable management for sensitive credentials
- Secure API key storage and rotation
- Input validation and sanitization
- CORS configuration for cross-origin security

### Regulatory Compliance
- CFPB compliance for mortgage disclosures
- State-specific regulatory adherence
- Document retention and audit trails
- Privacy protection for borrower information

## Performance Considerations

### Optimization Strategies
- **Async Processing**: FastAPI async/await for concurrent requests
- **Document Chunking**: Large file processing optimization
- **Caching**: Guideline and response caching opportunities
- **Database Indexing**: Optimized queries for guideline search
- **Error Recovery**: Robust retry mechanisms and fallback options

### Scalability Features
- **Microservice Architecture**: Modular component design
- **API Rate Limiting**: Protection against abuse
- **Load Balancing**: Ready for horizontal scaling
- **Database Optimization**: Efficient query patterns and indexing

## Future Enhancement Opportunities

### Technical Improvements
1. **Caching Layer**: Redis integration for improved response times
2. **Real-time Updates**: WebSocket integration for live guideline updates
3. **Advanced Analytics**: Comprehensive usage and performance metrics
4. **Multi-language Support**: Internationalization for diverse markets

### Feature Expansions
1. **Mobile Application**: React Native or progressive web app
2. **Advanced Reporting**: Comprehensive analytics dashboard
3. **Integration APIs**: Third-party lender and service provider connections
4. **Machine Learning**: Enhanced predictive modeling for loan outcomes

## Maintenance & Monitoring

### Health Monitoring
- System health endpoints for infrastructure monitoring
- Component-level health checks (Supabase, OpenAI, Addy AI)
- Performance metrics and alerting
- Error tracking and reporting

### Update Management
- Guideline version control and automated updates
- API versioning for backward compatibility
- Database migration management
- Deployment automation and rollback procedures

---

*This documentation represents a comprehensive analysis of the QuickLoan platform as of the latest codebase examination. The system demonstrates sophisticated integration of AI technologies with mortgage industry requirements, providing a robust foundation for intelligent mortgage advisory services.*