import s from './OnePicture.module.scss';
import axiosInstance from "@/api/axiosInstance.js";
import { useRef, useState, useEffect } from "react";


const OnePicture = ({ fileUrlCache, pictureInfo, chatContainerRef }) => {
  const id = pictureInfo.mediaFileId;
  const pictureRef = useRef(null);
  const scrollAdjustedRef = useRef(false); // Защита от повторного скролла для этой картинки

  const [isImageReady, setIsImageReady] = useState(false);

  const [currentUrl, setCurrentUrl] = useState(() => {
    const cached = fileUrlCache.current?.[id];
    const now = Date.now();
    if (cached && new Date(cached.expiresAt).getTime() > now) {
      return cached.url;
    }
    return "";
  });

  // Функция для корректировки скролла
  const adjustScroll = () => {
    if (scrollAdjustedRef.current) return;

    const height = pictureRef.current?.clientHeight || 0;
    if (height > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollTop + height;
      scrollAdjustedRef.current = true; // Помечаем, что скролл для этой картинки выполнен
    }
  }

  // Если картинка уже в кэше, проверяем её готовность
  useEffect(() => {
    if (currentUrl) {
      setIsImageReady(true);
      // Картинка из кэша может загрузиться мгновенно, пробуем скорректировать скролл
      // С небольшим таймаутом, чтобы элемент успел встроиться в DOM и получить высоту

      // setTimeout(adjustScroll, 0);  // убрала пока что
    }
  }, [currentUrl]);

  // Запрос нового URL, если его нет
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

  const handleLoad = () => {
    setIsImageReady(true);
    adjustScroll(); // Корректируем скролл при физической загрузке
  };

  return (
    <div className={s.imageWrapper}>
      {!isImageReady && <div className={s.skeleton} />}

      <img
        ref={pictureRef}
        onLoad={handleLoad}
        onClick={handleOpen}
        className={`${s.img} ${isImageReady ? s.visible : s.hidden}`}
        // Заменяем прозрачный пиксель на пустую строку, чтобы не триггерить ложные размеры 1x1
        src={currentUrl || ""}
        alt="img"
      />
    </div>
  );
};

export default OnePicture;




