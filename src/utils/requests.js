export const getPreviewPayload = (items) => {

  const payload = {
    items: []
  }

  const payloadArray = []
  items.forEach(item => {
    if (item.previewMediaFileId) payloadArray.push({
      previewMediaFileId: item.previewMediaFileId,
      requestId: item.requestId
    })
  })

  payload.items = payloadArray
  return payload
}

export const getRequestsWithPictures = ({requests, pictures}) => {
  const requestsWithPictures = requests.data.items.map((request) => {

    if (request.previewMediaFileId) {
      return {...request, picture: pictures.data.items[request.requestId].url}
    } else {
      return {...request, picture: null}
    }
  })

  const newRequests = {...requests.data, items: requestsWithPictures}
  return newRequests
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export function findSubCategoryById(arr, targetId) {
  return arr
    .flatMap(item => item.subCategories)
    .find(sub => sub.subCategoryId === targetId)
}

export function buildCategoryTree(categories) {
  const map = {};
  const tree = [];

  // Шаг 1: Инициализируем карту элементов и создаем массив для детей
  categories.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // Шаг 2: Связываем родителей и детей
  Object.values(map).forEach(item => {
    if (item.parentId === null) {
      // Если родителя нет, это корень дерева
      tree.push(item);
    } else {
      // Если родитель есть, добавляем элемент в его массив children
      const parent = map[item.parentId];
      if (parent) {
        parent.children.push(item);
      }
    }
  });

  // Шаг 3: Сортируем элементы по sortOrder (и по shortId, если sortOrder одинаковый)
  const sortNodes = (nodes) => {
    nodes.sort((a, b) => a.sortOrder - b.sortOrder || a.shortId - b.shortId);
    nodes.forEach(node => {
      if (node.children.length > 0) {
        sortNodes(node.children);
      }
    });
  };

  sortNodes(tree);
  return tree;
}

export const buildGroupedTags = (selectedTagIds, categories) => {

  if (!selectedTagIds.length) return []
  const selectedSet = new Set(selectedTagIds)

  return categories
    .map(category => {
      if (!category.tags) return null

      const matchedTags = category.tags.filter(tag =>
        selectedSet.has(tag.id)
      )

      if (matchedTags.length === 0) return null

      return {
        catId: category.id,
        catName: category.name,
        catSelectedTags: matchedTags
      }
    })
    .filter(Boolean)
}

export const getOpenedCategoryIds = (selectedCats, categories) => {
  const map = new Map(categories.map(cat => [cat.id, cat]))
  const result = new Set()

  selectedCats.forEach(cat => {
    let current = map.get(cat.id)
    while (current) {
      result.add(current.id)
      current = current.parentId ? map.get(current.parentId) : null
    }
  })

  return Array.from(result)
}

export function getChatsCountText(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} чатов`;
  }

  if (lastDigit === 1) {
    return `${count} чат`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} чата`;
  }

  return `${count} чатов`;
}

export  function getNewChatsNewText(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} новых`;
  }

  if (lastDigit === 1) {
    return `${count} новый`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} новых`; // не "новые", а "новых"
  }

  return `${count} новых`;
}


export function formatRequestsNumber(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} заявок`;
  }

  if (mod10 === 1) {
    return `${count} заявка`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} заявки`;
  }

  return `${count} заявок`;
}