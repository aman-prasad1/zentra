import crypto from "crypto";

export const normalizeQuery = q =>
    q.toLowerCase().trim().replace(/\s+/g, " ");

export const buildProductSearchKey = ({
    q,
    page,
    limit,
}) => {
    const raw = `q=${q}&page=${page}&limit=${limit}`;
    const hash = crypto.createHash("md5").update(raw).digest("hex");

    return `products:search:${hash}`;
};
