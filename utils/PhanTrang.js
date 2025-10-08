const paginate = (model, include = []) => async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // số trang
    const limit = parseInt(req.query.limit) || 5; // giới hạn mỗi trang
    const offset = (page - 1) * limit; // vị trí bắt đầu lấy dữ liệu

    try {
        const result = await model.findAndCountAll({
            limit,
            offset,
            include,
            distinct: true, //đếm sô ban ghi
        });

        res.paginateResult = {
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
            totalItems: result.count,
            data: result.rows,
        };

        next();
    } catch (error) {
        console.error("Lỗi phân trang:", error);
        res.status(500).json({ message: "Lỗi phân trang" });
    }
};

module.exports = paginate;
