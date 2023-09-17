export default function arrayToMapById(array: any) {
  return array.reduce((acc: any, obj: any) => {
    if (obj.id !== undefined && obj.id !== null) {
      acc[obj.id] = obj
    }
    return acc
  }, {})
}
