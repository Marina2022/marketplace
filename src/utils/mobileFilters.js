export const sortFilterValues = (filterSettingsSorted, nameHandle, currentFilters) => {

  const foundInState = currentFilters.find(stateItem => stateItem.nameHandle === nameHandle)

  if (foundInState) {

    filterSettingsSorted.sort((a, b) => {
      const arrayOfValues = foundInState.selectedValue.split(',')
      let result = 0
      if (arrayOfValues.includes(a.valueHandle) && !arrayOfValues.includes(b.valueHandle)) {
        result = -1
      } else {
        result = 1
      }
      return result
    })
  }
}