import request from './request'

/**
 * 获取所有分类对应的面试题标题
 */
export function getInterview() {
  return request({
    url: '/api/interview/interviewTitle',
    method: 'GET'
  })
}

/**
 * 根据面试题id获取面试题
 */
export function getInterviewById(id) {
  return request({
    url: `/api/interview/${id}`,
    method: 'GET'
  })
}
