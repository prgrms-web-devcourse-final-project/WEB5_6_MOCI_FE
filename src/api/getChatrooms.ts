import { BASE_URL } from "./constants/config";
import { APIerror } from "./getChatMsgMento";

export const getChatrooms = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/mentor/mentee/room`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};

export const getAIChatrooms = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/ai/room/mine`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};

export const getPublicAIChatrooms = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/ai/room`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};

// 멘토가 입장했던 채팅방조회
export const getMentorChatrooms = async () => {
  const res = await fetch(
    `${BASE_URL}/api/v1/chat/mentor/mentor/room/my-mentees`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};
// 멘토가 입장하지 않은 채팅방조회
export const getNoMentorChatrooms = async () => {
  const res = await fetch(
    `${BASE_URL}/api/v1/chat/mentor/mentor/room/non-mentor-list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};

// 멘토 전체채팅방조회
export const getAllChatrooms = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/mentor/mentor/room/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};
