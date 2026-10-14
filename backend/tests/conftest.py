import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.core.database import Base, get_db
from app.main import app

# In-memory SQLite database dedicated for test suite execution
TEST_SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Create fresh database tables for each test function."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """Provide TestClient with overridden get_db dependency."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def elder_auth_headers(client):
    """Register an elder user and provide authorized bearer headers."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "eleanor@careflow.org",
            "password": "SecurePassword123!",
            "full_name": "Eleanor Vance",
            "role": "ELDER"
        }
    )
    assert response.status_code == 201
    data = response.json()
    token = data["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(scope="function")
def guardian_auth_headers(client):
    """Register a guardian user and provide authorized bearer headers."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "guardian@careflow.org",
            "password": "SecurePassword123!",
            "full_name": "Marcus Vance",
            "role": "FAMILY_GUARDIAN"
        }
    )
    assert response.status_code == 201
    data = response.json()
    token = data["access_token"]
    return {"Authorization": f"Bearer {token}"}
