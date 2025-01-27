#!/bin/bash

# Remove existing virtual environment
rm -rf venv

# Remove any cached files
find . -type d -name "__pycache__" -exec rm -r {} +
find . -type f -name "*.pyc" -delete

# Create new virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Upgrade pip and install requirements
pip install --upgrade pip
pip install -e .

# Run tests
python -m loanFlash.run_system_tests 