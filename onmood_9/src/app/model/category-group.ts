import { CategoryGroupModule } from "./category-group-module";

export class CategoryGroup {
    id!: number;
    category_id!: number;
    video_id!: number;
    group_name!: string;
    group_description!: string;
	group_image!: string;
	is_paid!: string;
	created_on!: string;
	modified_on!: string;
    height!: number;
    customOptions!: any;
    modules!: CategoryGroupModule[]
}