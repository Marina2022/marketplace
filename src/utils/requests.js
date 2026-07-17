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


// export function findBySubCategoryId(arr, targetId) {
//
//   console.log('arr = ', arr)
//   console.log('targetId ============= ', targetId)
//
//   const result =  arr.find(item =>
//     item.subCategories.some(
//       sub => {
//         console.log("sub.subCategoryId = ", sub.subCategoryId)
//         console.log("targetId = ", targetId)
//         return sub.subCategoryId === targetId
//       }
//     )
//   )
//
//   console.log('result = ', result)
//
//   return result
// }

export function findSubCategoryById(arr, targetId) {
  return arr
    .flatMap(item => item.subCategories)
    .find(sub => sub.subCategoryId === targetId)
}