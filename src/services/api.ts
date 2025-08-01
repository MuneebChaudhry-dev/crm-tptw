// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LeadsParams {
  page?: number;
  per_page?: number;
  [key: string]: any;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const leadsApi = {
  getLeads: async (params: LeadsParams = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.per_page)
        queryParams.append('per_page', params.per_page.toString());

      // Add any other filter parameters if needed
      Object.keys(params).forEach((key) => {
        if (key !== 'page' && key !== 'per_page' && params[key]) {
          queryParams.append(key, params[key].toString());
        }
      });

      const url = queryParams.toString()
        ? `/leads?${queryParams.toString()}`
        : '/leads';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },
  updateDispositionStatus: async (leadId:number, dispositionStatus:string) => {
    try {
      const response = await apiClient.put('/leads/disposition-status', {
        lead_id: leadId,
        disposition_status: dispositionStatus,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating disposition status:', error);
      throw error;
    }
  },
};
