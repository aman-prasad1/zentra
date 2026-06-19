class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                $or: [
                    {
                        name: {
                            $regex: this.queryStr.keyword,
                            $options: "i"
                        }
                    },
                    {
                        category: {
                            $regex: this.queryStr.keyword,
                            $options: "i"
                        }
                    }
                ]
            } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        const mongoQuery = {};

        Object.keys(queryCopy).forEach((key) => {
            if (queryCopy[key] === "" || queryCopy[key] === null || queryCopy[key] === undefined) {
                return;
            }
            const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/);
            if (match) {
                const field = match[1]; // e.g., "price"
                const operator = `$${match[2]}`; // e.g., "$gte"
                const value = isNaN(queryCopy[key]) ? queryCopy[key] : Number(queryCopy[key]);

                if (!mongoQuery[field]) mongoQuery[field] = {};
                mongoQuery[field][operator] = value;
            } else {
                const val = queryCopy[key];
                if (typeof val === 'string' && isNaN(val)) {
                    mongoQuery[key] = { $regex: `^${val}$`, $options: "i" };
                } else {
                    mongoQuery[key] = isNaN(val) ? val : Number(val);
                }
            }
        });

        this.query = this.query.find(mongoQuery);
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export { ApiFeatures };