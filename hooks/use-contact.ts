"use client";

import { ContactService } from "@/api-client/contact";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { ContactPayload } from "@/types/science";
import { useMutation } from "@tanstack/react-query";

export function useContactMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.CONTACT],
    mutationFn: (payload: ContactPayload) => ContactService.submit(payload),
  });
}
