import { useMutation } from "@tanstack/react-query";

interface LeadInput {
  name: string;
  phone: string;
  businessType: string;
}

// Dummy hook to simulate API request for the exit intent popup
export function useCreateLead() {
  return useMutation({
    mutationFn: async (data: LeadInput) => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Lead captured:", data);
      return { success: true, message: "We'll be in touch within 10 minutes!" };
    },
  });
}
