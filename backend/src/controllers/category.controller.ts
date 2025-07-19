import { Response } from "express";

import { IPaginationQuery, IRequestUser } from "../utils/interfaces";
import CategoryModel, { categoryDAO } from "../models/category.model";
import response from "../utils/response";

export default {
    async create(req: IRequestUser, res: Response) {
        try {
            await categoryDAO.validate(req.body);
            const result = await CategoryModel.create(req.body);
            response.created(res, result, 'Category successfully created');
        } catch (error) {
            response.error(res, error, 'Failed to create category');
        }
    },
    async findAll(req: IRequestUser, res: Response) {
        const {page = 1, limit = 10, search} = req.query as unknown as IPaginationQuery;
        try {
            const query = {};
            
            if(search) {
                Object.assign(query, {
                    $or: [
                        {name: {$regex: search, $options: 'i'}},
                        {description: {$regex: search, $options: 'i'}}
                    ]
                });
            }

            const result = await CategoryModel
                .find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({createdAt: 'desc'})
                .exec();

            const count = await CategoryModel.countDocuments(query);
            const paginationInfo = {
                total: count,
                totalPages: Math.ceil(count/limit),
                current: page,
            };

            response.pagination(res, result, paginationInfo, 'Successfully fetched categories data');
        } catch (error) {
            response.error(res, error, 'No categories found');
        }
    },
    async findOne(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = CategoryModel.findById(id);
            response.success(res, result, 'Category successfully fetched');
        } catch (error) {
            response.error(res, error, 'Category not found');
        }
    },
    async update(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = CategoryModel.findByIdAndUpdate(id, req.body, {new: true});
            response.success(res, result, 'Category successfully updated');
        } catch (error) {
            response.error(res, error, 'Failed to update category');
        }
    },
    async remove(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = CategoryModel.findByIdAndDelete(id, {new: true});
            response.success(res, result, 'Category successfully deleted');
        } catch (error) {
            response.error(res, error, 'Failed to delete category');
        }
    },
};