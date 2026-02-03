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
        `/chat-app/chats/remove/${chatId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Fetch chats by ID
  static async GetChatById(chatId: string) {
    try {
      const response = await httpBase.get(`/chat-app/messages/${chatId}`);
      return response?.data?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
  //Send message
  static async SendMessage(chatId: string, content: string) {
    try {
      const response = await httpBase.post(`/chat-app/messages/${chatId}`, {
        content,
      });
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Delete Message by chatId & messageId
  static async Deletemessage(chatId: string, messageId: string) {
    try {
      const response = await httpBase.delete(
        `/chat-app/messages/${chatId}/${messageId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Create Group Chat
  static async CreateGroupChat(payload: {
    name: string;
    participants: string[];
  }) {
    try {
      const response = await httpBase.post("chat-app/chats/group", payload);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Fetch Group Chats Details by ID
  static async GetGroupChatById(chatId: string) {
    try {
      const response = await httpBase.get(`/chat-app/chats/group/${chatId}`);
      return response?.data?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //DELETE Group Chat by ID
  static async DeleteGroupChat(chatId: string) {
    try {
      const response = await httpBase.delete(
        `/chat-app/chats/group/remove/${chatId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Update Group Chat Name
  static async RenameGroupChat(chatId: string, name: string) {
    try {
      const response = await httpBase.put(`/chat-app/chats/group/${chatId}`, {
        name,
      });
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //Add Participant to Group Chat
  static async AddParticipantToGroupChat(
    chatId: string,
    participantId: string,
  ) {
    try {
      const response = await httpBase.post(
        `/chat-app/chats/group/${chatId}/${participantId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }

  //  Remove Participant from Group Chat
  static async RemoveParticipantFromGroupChat(
    chatId: string,
    participantId: string,
  ) {
    try {
      const response = await httpBase.delete(
        `/chat-app/chats/group/${chatId}/${participantId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
  //Leave Group Chat
  static async LeaveGroupChat(chatId: string) {
    try {
      const response = await httpBase.delete(
        `/chat-app/chats/leave/group/${chatId}`,
      );
      return response?.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  }
}
export default ChatService;
