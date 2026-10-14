def test_register_elder_bootstraps_profile_and_checklist(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "arthur@careflow.org",
            "password": "Password123!",
            "full_name": "Arthur Pendelton",
            "role": "ELDER"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "ELDER"
    assert data["full_name"] == "Arthur Pendelton"


def test_duplicate_registration_rejected(client):
    payload = {
        "email": "duplicate@careflow.org",
        "password": "Password123!",
        "full_name": "Test User",
        "role": "ELDER"
    }
    first_res = client.post("/api/v1/auth/register", json=payload)
    assert first_res.status_code == 201

    second_res = client.post("/api/v1/auth/register", json=payload)
    assert second_res.status_code == 400
    assert "already exists" in second_res.json()["detail"]


def test_login_success_and_failure(client):
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "login_test@careflow.org",
            "password": "CorrectPassword123!",
            "full_name": "Login Tester",
            "role": "ELDER"
        }
    )

    # Valid credentials
    res_valid = client.post(
        "/api/v1/auth/login",
        json={"email": "login_test@careflow.org", "password": "CorrectPassword123!"}
    )
    assert res_valid.status_code == 200
    assert "access_token" in res_valid.json()

    # Invalid credentials
    res_invalid = client.post(
        "/api/v1/auth/login",
        json={"email": "login_test@careflow.org", "password": "WrongPassword!"}
    )
    assert res_invalid.status_code == 401


def test_get_current_user_profile(client, elder_auth_headers):
    response = client.get("/api/v1/auth/me", headers=elder_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "eleanor@careflow.org"
    assert data["role"] == "ELDER"
