function checkPalindrome(str) {
    const cleanedStr = str.replace(/\s/g, '').toLowerCase();
    const length = cleanedStr.length;
  
    for (let i = 0; i < Math.floor(length / 2); i++) {
      if (cleanedStr[i] !== cleanedStr[length - i - 1]) {
        return false;
      }
    }
  
    return true;
  }
  
  module.exports = checkPalindrome;
  