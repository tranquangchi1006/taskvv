import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
    try {
        // const tasks = await Task.find().sort({ createdAt: -1 })
        const result = await Task.aggregate([
            // { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                },
            },

        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
        // res.status(200).json(result)
    } catch (error) {
        console.log('error :>> ', error);
    }
}

export const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const task = new Task({ title })
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (error) {
        console.log('error :>> ', error);
    }
}

export const updateTask = async (req, res) => {
    console.log('hello');
    try {

        const { title, status, completedAt } = req.body
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            { new: true }
        )
        if (!updateTask) {
            return res.status(404).json({ message: 'update không thành công' })

        }
        res.status(200).json(updateTask)
    } catch (error) {
        console.log('error :>> ', error);
    }
}

export const deleteTask = async (req, res) => {
    console.log('deleteTask');
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id,)
        if (!deleteTask) {
            return res.status(404).json({ message: 'deleteTask không thành công' })
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        console.log('error :>> ', error);
    }
}