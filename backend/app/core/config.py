import os
from dotenv import load_dotenv

load_dotenv()
# Provide a sensible default so importing the app doesn't fail when
# DATABASE_URL isn't set in the environment (use a local sqlite file).
DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./hrms.db"