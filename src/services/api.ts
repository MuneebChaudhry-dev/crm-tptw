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
  updateDispositionStatus: async (
    leadId: string,
    dispositionStatus: string,
    followUpData: {
      follow_up_message: string;
      follow_up_date: string;
      follow_up_time: string;
    } = {
      follow_up_message: '',
      follow_up_date: '',
      follow_up_time: ''
    }
  ) => {
    try {
      const payload = {
        lead_id: leadId,
        disposition_status: dispositionStatus,
        
      };

      // Add follow-up data if provided
      if (followUpData) {
        payload.follow_up_message = followUpData.follow_up_message;
        payload.follow_up_date = followUpData.follow_up_date;
        payload.follow_up_time = followUpData.follow_up_time;
      }

      const response = await apiClient.post(
        '/leads/disposition-status',
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error updating disposition status:', error);
      throw error;
    }
  },
};
