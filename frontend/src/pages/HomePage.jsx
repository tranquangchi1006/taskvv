import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks()
    }, [])

    // useEffect(() => {
    //     setPage(1);
    // }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks")
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
            // setTaskBuffer(res.data)

            console.log('data :>> ', res.data);
        } catch (error) {
            console.error('Lỗi khi truy xuất tasks', error)
            toast.error('Lỗi khi truy xuất tasks')
        }
    }

    const handleTaskChanged = () => {
        fetchTasks();
    };

    // biến
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete";
            default:
                return true;
        }
    });

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTasks.length === 0) {
        handlePrev();
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <div className="min-h-screen w-full relative">
            {/* Minty Cloud Drift Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(120deg, #C8E6C9 0%, #DCEDC8 20%, #F1F8E9 40%, #FFFDE7 60%, #FFF9C4 80%, #F0F4C3 100%)`,
                }}
            />
            {/* Your Content/Components */}
            <div className='containter pt-8 mx-auto relative z-10'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                    {/*Đầu trang*/}
                    <Header />

                    {/*Tạo nhiệm vụ*/}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />

                    {/*Thống kê và bộ lọc*/}
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />

                    {/*Danh sách nhiệm vụ*/}
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />

                    {/*Phân trang và lọc theo date*/}
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        {/* <DateTimeFilter /> */}
                    </div>

                    {/*Chân trang*/}
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />

                </div>
            </div>
        </div>

    )
}

export default HomePage
