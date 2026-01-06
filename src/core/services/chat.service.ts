import httpBase from "@/core/services/httpBase";
import { AxiosError } from "axios";
import { handleError } from "@/utils/http.utils";

import type { AxiosResponseInterface } from "@/@types/responses/api-response";

class ChatService {
  static async GetChatList() {
    try {
      const response: AxiosResponseInterface<unknown> =
        await httpBase.get("/chat-app/chats");
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  static async GetAvailableUsers() {
    try {
      const response = await httpBase.get("/chat-app/chats/users");
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  static async DeleteChat(chatId: string) {
    try {
      const response = await httpBase.delete(
        `/chat-app/chats/remove/${chatId}`
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
}
export default ChatService;
