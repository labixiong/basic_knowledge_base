// 得到所有的省份
export async function getProvinces() {
  return await fetch('/api/local').then(res => res.json())
}

// 根据省份id获取该省份的城市
export async function getCities(parentId) {
  return await fetch(`/api/local?parentId=${parentId}`).then(res => res.json())
}