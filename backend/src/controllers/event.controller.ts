import { Response } from "express";
import response from "../utils/response";
import { FilterQuery } from "mongoose";

import { IPaginationQuery, IRequestUser } from "../utils/interfaces";
import EventModel, { Event, eventDAO } from "../models/event.model";

export default {
    async create(req: IRequestUser, res: Response) {
        try {
            const payload = {...req.body, createdBy: req.user?.id} as Event;
            await eventDAO.validate(payload);
            const result = await EventModel.create(payload);
            response.created(res, result, 'Event successfully created')
        } catch (error) {
            response.error(res, error, 'Failed to create event');
        }
    },
    async findAll(req: IRequestUser, res: Response) {
        const {page = 1, limit = 10, search} = req.query as unknown as IPaginationQuery;
        try {
            const query: FilterQuery<Event> = {};
            
            if(search) {
                Object.assign(query, {
                    ...query,
                    $text: {
                        $search: search,
                    },
                });
            }

            const result = await EventModel
                .find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({createdAt: 'desc'})
                .exec();

            const count = await EventModel.countDocuments(query);
            const paginationInfo = {
                total: count,
                totalPages: Math.ceil(count/limit),
                current: page,
            };

            response.pagination(res, result, paginationInfo, 'Successfully fetched events data');
        } catch (error) {
            response.error(res, error, 'No events found');
        }
    },
    async findOne(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = EventModel.findById(id);
            response.success(res, result, 'Event successfully fetched');
        } catch (error) {
            response.error(res, error, 'Event not found');
        }
    },
    async update(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = EventModel.findByIdAndUpdate(id, req.body, {new: true});
            response.success(res, result, 'Category successfully updated');
        } catch (error) {
            response.error(res, error, 'Failed to update event');
        }
    },
    async remove(req: IRequestUser, res: Response) {
        const { id } = req.params;
        try {
            const result = EventModel.findByIdAndDelete(id, {new: true});
            response.success(res, result, 'Event successfully deleted');
        } catch (error) {
            response.error(res, error, 'Failed to delete event');
        }
    },
    async findOneBySlug(req: IRequestUser, res: Response) {
        const { slug } = req.params;
        try {
            const result = EventModel.findOne({slug});
            response.success(res, result, 'Event successfully fetched');
        } catch (error) {
            response.error(res, error, 'Event not found');
        }
    },
}