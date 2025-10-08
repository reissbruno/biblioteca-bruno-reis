# Biblioteca Backend API

Backend REST API para o sistema de gerenciamento de biblioteca pessoal.

## Requisitos

- Python 3.11+
- pip

## Setup

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env

# Inicializar banco de dados com dados de exemplo
python seed_data.py

# Executar servidor de desenvolvimento
python main.py
```

O servidor estará disponível em `http://localhost:8000`

## Documentação API

Acesse `http://localhost:8000/docs` para ver a documentação interativa Swagger.

## Estrutura

```
backend/
├── main.py              # Aplicação FastAPI principal
├── models.py            # Modelos SQLAlchemy
├── schemas.py           # Schemas Pydantic
├── database.py          # Configuração do banco de dados
├── crud.py              # Operações CRUD
├── seed_data.py         # Script para popular banco com dados iniciais
└── requirements.txt     # Dependências Python
```
