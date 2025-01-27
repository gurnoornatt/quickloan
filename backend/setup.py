from setuptools import setup, find_packages

setup(
    name="loanFlash",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        'numpy>=1.24.0',
        'scikit-learn>=1.0.2',
        'fastapi>=0.68.0,<0.69.0',
        'pydantic>=1.8.0,<2.0.0',
        'uvicorn>=0.15.0,<0.16.0',
        'python-dotenv>=0.19.0,<0.20.0',
        'openai>=0.27.0,<0.28.0',
        'python-multipart>=0.0.5,<0.0.7',
        'supabase>=1.0.3',
        'PyJWT>=2.0.0',
        'python-jose[cryptography]>=3.3.0',
        'colorama>=0.4.6',
        'flask>=2.0.0',
        'PyPDF2>=3.0.0',
    ],
    package_data={
        'loanFlash': ['*.json'],  # Include JSON files
    },
) 