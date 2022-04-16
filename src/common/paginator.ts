export const paginator = (totalCount: number, pageNumber: number | undefined, pageSize: number | undefined) => {
    const ppageNumber = pageNumber ? Math.max(1, pageNumber) : 1;
    const ppageSize = pageSize ? Math.max(1, pageSize) : 20;

    const skip = (ppageNumber - 1) * ppageSize;
    const limit = ppageSize;
    const counts = totalCount;
    const pagesize = ppageSize;
    const pagenumber = ppageNumber;
    const totalpages = totalCount > ppageSize ? Math.ceil(totalCount / ppageSize) : 1;
    const haspreviouspage = pagenumber > 1;
    const hasnextpage = totalpages > pagenumber;

    return { skip, limit, counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage };
};
