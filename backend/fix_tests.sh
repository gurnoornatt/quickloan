#!/bin/bash

# Add flask-cors to requirements
echo "flask-cors>=4.0.0" >> requirements.txt

# Install updated requirements
source venv/bin/activate
pip install -r requirements.txt

# Create guideline files if they don't exist
cat > loanFlash/fannie_mae_guidelines.json << EOL
{
    "guidelines": [
        {
            "id": 1,
            "category": "LTV",
            "content": "Maximum LTV is 97% for fixed-rate mortgages",
            "source": "Fannie Mae"
        }
    ]
}
EOL

cat > loanFlash/freddie_mac_guidelines.json << EOL
{
    "guidelines": [
        {
            "id": 1,
            "category": "LTV",
            "content": "Maximum LTV is 95% for fixed-rate mortgages",
            "source": "Freddie Mac"
        }
    ]
}
EOL

# Run integration tests with real credentials
echo "Running integration tests..."
python -m loanFlash.run_system_tests

# Run unit tests with mocks
echo "Running unit tests..."
TEST_MODE=unit python -m unittest discover -s loanFlash -p "test_*.py" -v 