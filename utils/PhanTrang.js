const paginate = (model, include = []) => async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const result = await model.findAndCountAll({
            limit,
            offset,
            include,
            distinct: true, //dem sô ban ghi
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
