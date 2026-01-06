import httpBase from "@/core/services/httpBase";
import { AxiosError } from "axios";
import { handleError } from "@/utils/http.utils";

import type { AxiosResponseInterface } from "@/@types/responses/api-response";

class ChatService {
  //Fetch all users
  static async GetAllUser() {
    try {
      const response: AxiosResponseInterface<unknown> =
        await httpBase.get("/chat-app/chats");
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
  //Fetch Available user list
  static async GetAvailableUsers() {
    try {
      const response = await httpBase.get("/chat-app/chats/users");
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //create one to one chat
  static async CreateOneToOneChat(userId: string) {
    try {
      const response = await httpBase.post(`/chat-app/chats/c/${userId}`);
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Delete chat by ID
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
