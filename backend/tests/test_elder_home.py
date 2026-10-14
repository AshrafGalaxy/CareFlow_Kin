def test_get_elder_home_deck(client, elder_auth_headers):
    response = client.get("/api/v1/elder/home", headers=elder_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "greeting" in data
    assert "Eleanor" in data["greeting"]
    assert "date" in data
    assert len(data["checklist_items"]) > 0
    assert data["checklist_total_count"] == len(data["checklist_items"])
    assert data["adherence_rate_percentage"] == 100.0
