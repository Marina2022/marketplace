import s from './OnePicture.module.scss';
import axiosInstance from "@/api/axiosInstance.js";
import { useRef, useState, useEffect } from "react";

const OnePicture = ({ fileUrlCache, pictureInfo, chatContainerRef }) => {
  const id = pictureInfo.mediaFileId;
  const pictureRef = useRef(null);

  // Флаг, что картинка физически загрузилась браузером и готова к показу
  const [isImageReady, setIsImageReady] = useState(false);

  // 1. Инициализируем URL. Если кэш протух или его нет, стартуем с пустой строки,
  // но НЕ удаляем сам тег <img> из DOM
  const [currentUrl, setCurrentUrl] = useState(() => {
    const cached = fileUrlCache.current?.[id];
    const now = Date.now();
    if (cached && new Date(cached.expiresAt).getTime() > now) {
      return cached.url;
    }
    return "";
  });

  // Если картинка уже была в кэше, она готова сразу (чтобы не было анимации при скролле)
  useEffect(() => {
    if (currentUrl) {
      setIsImageReady(true);
    }
  }, []);

  // 2. Запрос нового URL, если его нет
  useEffect(() => {
    if (currentUrl) return;

    let isMounted = true;

    const fetchNewUrl = async () => {
      try {
        const response = await axiosInstance.post(`chat/files/urls`, {
          mediaFileIds: [id],
          ttlSeconds: 600
        });

        const file = response.data.items[id];
        const url = file.url;

        if (fileUrlCache.current) {
          fileUrlCache.current[id] = {
            url,
            expiresAt: response.data.expiresAt
          };
        }

        if (isMounted) {
          setCurrentUrl(url);
        }
      } catch (e) {
        console.error("Failed to fetch image URL:", e);
      }
    };

    fetchNewUrl();

    return () => {
      isMounted = false;
    };
  }, [id, currentUrl, fileUrlCache]);

  const handleOpen = async () => {
    if (currentUrl) {
      window.open(currentUrl, "_blank");
    }
  };

  // 3. Срабатывает ТОЛЬКО когда браузер полностью скачал и отрисовал картинку в память
  const handleLoad = () => {
    if (isImageReady) return; // Защита от повторных срабатываний

    setIsImageReady(true);

    // Корректируем скролл чата
    const height = pictureRef.current?.clientHeight || 0;
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollTop + height;
    }
  };

  return (
    <div className={s.imageWrapper}>
      {/* Скелетон или лоадер сидит под картинкой абсолютно позиционированным */}
      {!isImageReady && <div className={s.skeleton} />}

      {/* Тег img всегда в DOM, но проявляется только по onLoad */}
      <img
        ref={pictureRef}
        onLoad={handleLoad}
        onClick={handleOpen}
        // Добавляем класс видимости в зависимости от готовности
        className={`${s.img} ${isImageReady ? s.visible : s.hidden}`}
        // Если урла еще нет, ставим прозрачный пиксель, чтобы браузер не ругался и не мигал
        src={currentUrl || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
        alt="img"
      />
    </div>
  );
};

export default OnePicture;
