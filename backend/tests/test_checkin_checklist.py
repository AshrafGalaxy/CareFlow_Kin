from datetime import datetime, timezone


def test_daily_wellness_checkin(client, elder_auth_headers):
    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Submit checkin
    res = client.post(
        "/api/v1/checkins",
        headers=elder_auth_headers,
        json={
            "date": today_str,
            "status": "GOOD",
            "notes": "Feeling energized and went for a light morning walk."
        }
    )
    assert res.status_code == 201
    data = res.json()
    assert data["status"] == "GOOD"
    assert data["date"] == today_str

    # Verify checkin history
    hist_res = client.get("/api/v1/checkins/history", headers=elder_auth_headers)
    assert hist_res.status_code == 200
    assert len(hist_res.json()) >= 1


def test_checklist_complete_and_skip(client, elder_auth_headers):
    # Fetch today's checklist
    list_res = client.get("/api/v1/checklist/today", headers=elder_auth_headers)
    assert list_res.status_code == 200
    items = list_res.json()
    assert len(items) >= 2
    item_id_1 = items[0]["id"]
    item_id_2 = items[1]["id"]

    # Mark first item complete
    comp_res = client.post(f"/api/v1/checklist/{item_id_1}/complete", headers=elder_auth_headers)
    assert comp_res.status_code == 200
    assert comp_res.json()["today_status"] == "COMPLETED"

    # Mark second item skipped
    skip_res = client.post(
        f"/api/v1/checklist/{item_id_2}/skip",
        headers=elder_auth_headers,
        json={"reason": "Inclement weather"}
    )
    assert skip_res.status_code == 200
    assert skip_res.json()["today_status"] == "SKIPPED"


def test_unauthorized_access_rejected(client):
    res = client.get("/api/v1/elder/home")
    assert res.status_code == 401
