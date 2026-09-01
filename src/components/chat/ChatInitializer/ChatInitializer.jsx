// src/components/ChatInitializer.jsx
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {initChat, switchProfile, logoutChat, clearChatStore} from "@/store/chatSlice.js";
import { getActiveProfileId, getIsAuthenticated } from "@/store/userSlice.js";

export function ChatInitializer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const profileId = useSelector(getActiveProfileId);
  const connectionState = useSelector((state) => state.chat.connectionState);

  // Храним предыдущий id, чтобы поймать момент смены
  const prevProfileIdRef = useRef(null);

  useEffect(() => {
    // Сценарий 1: Логаут
    if (!isAuthenticated) {
      if (connectionState !== "Disconnected") {
        dispatch(logoutChat());
      }
      prevProfileIdRef.current = null;
      return;
    }

    // Если авторизован, но profileId еще не загрузился, ждем
    if (!profileId) return;

    // Сценарий 2: Первая инициализация (подключение к хабу)
    if (connectionState === "Disconnected" && !prevProfileIdRef.current) {
      prevProfileIdRef.current = profileId;
      dispatch(initChat(profileId));
      return;
    }

    // Сценарий 3: Смена профиля
    if (prevProfileIdRef.current && prevProfileIdRef.current !== profileId) {
      prevProfileIdRef.current = profileId;
      dispatch(clearChatStore())
      dispatch(switchProfile(profileId));
    }

  }, [isAuthenticated, profileId, connectionState, dispatch]);

  return null;
}

