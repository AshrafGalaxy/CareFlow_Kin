from datetime import datetime, timezone


def test_medication_crud_and_adherence(client, elder_auth_headers):
    # 1. Create a medication
    create_res = client.post(
        "/api/v1/medications",
        headers=elder_auth_headers,
        json={
            "name": "Lisinopril",
            "dosage": "10mg",
            "frequency": "DAILY",
            "times_of_day": "08:00",
            "instructions": "Take with breakfast",
            "prescribed_by": "Dr. Sarah Chen",
            "status": "ACTIVE"
        }
    )
    assert create_res.status_code == 201
    med_id = create_res.json()["id"]

    # 2. List medications
    list_res = client.get("/api/v1/medications", headers=elder_auth_headers)
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1

    # 3. Log one dose as TAKEN
    log_taken = client.post(
        f"/api/v1/medications/{med_id}/logs",
        headers=elder_auth_headers,
        json={
            "scheduled_for": datetime.now(timezone.utc).isoformat(),
            "status": "TAKEN"
        }
    )
    assert log_taken.status_code == 201

    # 4. Log one dose as SKIPPED
    log_skipped = client.post(
        f"/api/v1/medications/{med_id}/logs",
        headers=elder_auth_headers,
        json={
            "scheduled_for": datetime.now(timezone.utc).isoformat(),
            "status": "SKIPPED",
            "reason": "Upset stomach"
        }
    )
    assert log_skipped.status_code == 201

    # 5. Verify adherence rate: 1 taken out of 2 total = 50.0%
    adherence_res = client.get("/api/v1/medications/adherence", headers=elder_auth_headers)
    assert adherence_res.status_code == 200
    adherence = adherence_res.json()
    assert adherence["total_scheduled"] == 2
    assert adherence["total_taken"] == 1
    assert adherence["total_skipped"] == 1
    assert adherence["adherence_rate_percentage"] == 50.0
