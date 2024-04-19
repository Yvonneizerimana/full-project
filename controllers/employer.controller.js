import employerModel from '../models/employer.model.js';

const employerController = {
    create: async (req, res, next) => {
        try {
            const employer = await employerModel.create(req.body);
            res.status(200).send(employer);
        } catch (error) {
            next(error)
        }
    }
}

export default employerController;
