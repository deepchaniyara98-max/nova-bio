import clientApi from "@/api-client/client";
import type { ContactPayload, ContactResponse } from "@/types/science";

export const ContactService = {
  submit: (payload: ContactPayload) =>
    clientApi.post("contact", { json: payload }).json<ContactResponse>(),
};
