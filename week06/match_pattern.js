/**
 * @param {string} pattern
 * @return {object}
 */
function buildNextMap(pattern) {
    const nextMap = {}
    let idx = 0 // 自相似子串的尾指针
    for (let i = 1; i < pattern.length; i++) {
      if (pattern[i] === pattern[idx]) {
        idx++
      } else if (idx > 0) {
        nextMap[`match_${pattern.slice(0, i + 1)}`] = `match_${pattern.slice(0, idx + 1)}`
        idx = (pattern[i] === pattern[0]) ? 1 : 0
      }
    }
    return nextMap
  }
  
  /**
   * @param {string} pattern
   * @return {object}
   */
  function buildStatus(pattern) {
    // 匹配失败的next字典
    const nextMap = buildNextMap(pattern);
    const initKey = `match_${pattern[0]}`
    const status = {
      // 初始状态机
      [initKey]: (c) => {
        if (c === pattern[0]) {
          return (pattern.length === 1) ? 'end' : `match_${pattern.slice(0, 2)}`
        }
        return initKey
      },
      // 终止状态机
      end: () => 'end'
    }
  
    // 生成中间状态机
    for (let i = pattern.length - 1; i > 0; i--) {
      const key = `match_${pattern.slice(0, i + 1)}`
      const nextKey = `match_${pattern.slice(0, i + 2)}`
  
      status[key] = function (char) {
        if (char === pattern[i]) {
          return (key === nextKey) ? 'end' : nextKey
        } else if (nextMap[key]) {
          return status[nextMap[key]](char)
        } else {
          return status[initKey](char)
        }
      }
    }
  
    return status
  }
  
  /**
   * @param {string} pattern
   * @param {string} string
   * @return {boolean}
   */
  function match(pattern, string) {
    if (pattern.length === 0) {
      return true
    }
    const status = buildStatus(pattern)
    let currentStatus = status[`match_${pattern[0]}`]
  
    for (const char of string) {
      currentStatus = status[currentStatus(char)]
    }
    return currentStatus === status.end
  }