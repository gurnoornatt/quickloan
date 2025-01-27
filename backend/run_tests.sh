#!/bin/bash
# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Install package in development mode
pip install -e .

# Run tests
python -m loanFlash.run_system_tests 