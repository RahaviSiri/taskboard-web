export class SubTask {
    title: string;
    description: string;
    order: number;

    constructor(title: string, description: string, order: number) {
        this.title = title;
        this.description = description;
        this.order = order;
    }
}
