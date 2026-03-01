import { adminClient } from './adminClient';

export interface Vacation {
    id: string;
    employeeCarnet: string;
    startDate: string;
    endDate: string;
    reason?: string;
    createdAt: string;
}

export const vacationService = {
    create: async (data: {
        employeeCarnet: string;
        startDate: string;
        endDate: string;
        reason?: string;
    }) => {
        const res = await adminClient.post('/vacation', data);
        return res.data;
    },

    findByEmployee: async (carnet: string): Promise<Vacation[]> => {
        const res = await adminClient.get(`/vacation/employee/${carnet}`);
        return res.data as Vacation[];
    },

    delete: async (id: string) => {
        const res = await adminClient.delete(`/vacation/${id}`);
        return res.data;
    },
};
