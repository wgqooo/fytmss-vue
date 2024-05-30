export interface Page{
    startRow?: number,//由第几条开始
    endRow?: number,//到第几条结束
    hasNextPage?: boolean,//是否有下一页
    hasPreviousPage?: boolean,//是否有上一页
    isFirstPage?: boolean,//是否为首页
    isLastPage?: boolean,//是否为尾页
    list: [],// 查出出来的数据集合
    navigateFirstPage?: number,//首页
    navigateLastPage?: number,//尾页
    navigatePages?: number,//每页显示的页码个数
    navigatepageNums?: [],//页码数
    nextPage: number,//下一页
    pageNum: number, //当前页码
    pageSize: number,//每页个数
    pages: number,//总页数
    prePage: number,//上一页
    size: number,//当前页个数
    total: number//总条数
}