import axios from "axios";
import { Platform } from "react-native";

export const API_BASE_URL = Platform.select({
  android: "http://10.0.2.2:8000/api/v1",
  default: "http://localhost:8000/api/v1",
});

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const TOKEN_STORAGE_KEY = "careflow_auth_token";
const USER_STORAGE_KEY = "careflow_user_profile";

let authToken: string | null = null;
let cachedUser: UserProfile | null = null;

// Synchronously rehydrate session from browser storage on web
if (typeof window !== "undefined" && window.localStorage) {
  try {
    const savedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (savedToken) {
      authToken = savedToken;
    }
    const savedUserJson = window.localStorage.getItem(USER_STORAGE_KEY);
    if (savedUserJson) {
      cachedUser = JSON.parse(savedUserJson);
    }
  } catch (_) {
    // Storage inaccessible
  }
}

// Robust Axios Request Interceptor guarantees dynamic Bearer token attachment on all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAuthToken = (): string | null => authToken;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch (_) {}
  }
};

export const getSavedUser = (): UserProfile | null => cachedUser;

export const setSavedUser = (user: UserProfile | null) => {
  cachedUser = user;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      if (user) {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (_) {}
  }
};

export const clearAuthSession = () => {
  setAuthToken(null);
  setSavedUser(null);
};

// Strongly Typed API Contracts matching Backend Pydantic Schemas
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  role: "ELDER" | "FAMILY_GUARDIAN" | "LOCAL_CARE_PARTNER" | "DOCTOR" | "PROVIDER_ADMIN";
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role: string;
  user_id: string;
  full_name: string;
}

export interface ChecklistItem {
  id: string;
  patient_id: string;
  title: string;
  description?: string;
  time_of_day: "MORNING" | "AFTERNOON" | "EVENING" | "BEDTIME" | "ANYTIME";
  icon_name: string;
  is_active: boolean;
  today_status?: "COMPLETED" | "SKIPPED";
  completed_at?: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  name: string;
  dosage: string;
  frequency: string;
  times_of_day: string;
  instructions?: string;
  prescribed_by?: string;
  status: "ACTIVE" | "PAUSED" | "DISCONTINUED";
}

export interface CheckIn {
  id: string;
  patient_id: string;
  date: string;
  status: "GOOD" | "OKAY" | "NOT_WELL" | "NEEDS_HELP";
  notes?: string;
  recorded_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  title: string;
  doctor_name: string;
  clinic_name?: string;
  scheduled_at: string;
  location?: string;
  notes?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
}

export interface TimelineEvent {
  id: string;
  patient_id: string;
  event_type: "MEDICATION" | "CHECKIN" | "CHECKLIST" | "APPOINTMENT" | "CARE_UPDATE" | "SAFETY";
  reference_id?: string;
  title: string;
  description?: string;
  timestamp: string;
  privacy_level: "CARE_CIRCLE" | "CLINICAL_ONLY" | "PRIVATE";
}

export interface ElderHomeData {
  greeting: string;
  date: string;
  elder_name: string;
  today_checkin?: CheckIn;
  checklist_items: ChecklistItem[];
  checklist_completed_count: number;
  checklist_total_count: number;
  next_medications: Medication[];
  upcoming_appointment?: Appointment;
  adherence_rate_percentage: number;
}

export interface AdherenceReport {
  total_scheduled: number;
  total_taken: number;
  total_missed: number;
  total_skipped: number;
  adherence_rate_percentage: number;
}

// API Service Functions
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<TokenResponse> => {
      const res = await apiClient.post<TokenResponse>("/auth/login", { email, password });
      setAuthToken(res.data.access_token);
      return res.data;
    },
    demoLogin: async (): Promise<TokenResponse> => {
      return await api.auth.login("eleanor@careflow.com", "ElderPass123!");
    },
    register: async (payload: {
      email: string;
      password: string;
      full_name: string;
      role?: string;
      phone_number?: string;
    }): Promise<TokenResponse> => {
      const res = await apiClient.post<TokenResponse>("/auth/register", payload);
      setAuthToken(res.data.access_token);
      return res.data;
    },
    googleAuth: async (payload: {
      email: string;
      full_name: string;
      role?: string;
      google_id?: string;
    }): Promise<TokenResponse> => {
      const res = await apiClient.post<TokenResponse>("/auth/google", payload);
      setAuthToken(res.data.access_token);
      return res.data;
    },
    getMe: async (): Promise<UserProfile> => {
      const res = await apiClient.get<UserProfile>("/auth/me");
      setSavedUser(res.data);
      return res.data;
    },
  },

  elder: {
    getHomeDeck: async (): Promise<ElderHomeData> => {
      const res = await apiClient.get<ElderHomeData>("/elder/home");
      return res.data;
    },
  },

  checklist: {
    getToday: async (): Promise<ChecklistItem[]> => {
      const res = await apiClient.get<ChecklistItem[]>("/checklist/today");
      return res.data;
    },
    complete: async (id: string): Promise<ChecklistItem> => {
      const res = await apiClient.post<ChecklistItem>(`/checklist/${id}/complete`);
      return res.data;
    },
    skip: async (id: string, reason?: string): Promise<ChecklistItem> => {
      const res = await apiClient.post<ChecklistItem>(`/checklist/${id}/skip`, { reason });
      return res.data;
    },
  },

  medications: {
    list: async (): Promise<Medication[]> => {
      const res = await apiClient.get<Medication[]>("/medications");
      return res.data;
    },
    create: async (data: Partial<Medication>): Promise<Medication> => {
      const res = await apiClient.post<Medication>("/medications", data);
      return res.data;
    },
    logIntake: async (
      medicationId: string,
      status: "TAKEN" | "SKIPPED" | "MISSED",
      reason?: string
    ) => {
      const res = await apiClient.post(`/medications/${medicationId}/logs`, {
        scheduled_for: new Date().toISOString(),
        status,
        reason,
      });
      return res.data;
    },
    getAdherence: async (): Promise<AdherenceReport> => {
      const res = await apiClient.get<AdherenceReport>("/medications/adherence");
      return res.data;
    },
  },

  checkins: {
    submit: async (
      date: string,
      status: "GOOD" | "OKAY" | "NOT_WELL" | "NEEDS_HELP",
      notes?: string
    ): Promise<CheckIn> => {
      const res = await apiClient.post<CheckIn>("/checkins", { date, status, notes });
      return res.data;
    },
    getHistory: async (): Promise<CheckIn[]> => {
      const res = await apiClient.get<CheckIn[]>("/checkins/history");
      return res.data;
    },
  },

  appointments: {
    list: async (): Promise<Appointment[]> => {
      const res = await apiClient.get<Appointment[]>("/appointments");
      return res.data;
    },
    create: async (payload: Partial<Appointment>): Promise<Appointment> => {
      const res = await apiClient.post<Appointment>("/appointments", payload);
      return res.data;
    },
  },

  timeline: {
    getEvents: async (): Promise<TimelineEvent[]> => {
      const res = await apiClient.get<TimelineEvent[]>("/timeline");
      return res.data;
    },
  },
};
