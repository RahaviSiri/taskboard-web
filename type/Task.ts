import { TaskStatus } from "@/enums/TaskStatus";
import { SubTask } from "./SubTask";

export class Task {
    id: string;
    title: string;
    description: string;
    startDate: string;
    subTasks: SubTask[];
    status: TaskStatus;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
        this.description = '';
        this.startDate = '';
        this.subTasks = [];
        this.status = TaskStatus.Pending;
    }
}
