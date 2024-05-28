// dateUtils.js

export const dateFormat =  function formatDateFromBackend(backendTimeString) {
    // 将后端传来的时间格式转换为 yyyy-mm-dd 格式
    const backendDate = new Date(backendTimeString);
    const year = backendDate.getFullYear();
    const month = (backendDate.getMonth() + 1).toString().padStart(2, '0');
    const day = backendDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
