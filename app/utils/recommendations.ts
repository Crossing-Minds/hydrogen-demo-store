export const removeDuplicatedIds = (
  originIds: string[],
  comparedToIds: string[]
) => {
  return originIds.filter(originId => !comparedToIds.includes(originId))
}
