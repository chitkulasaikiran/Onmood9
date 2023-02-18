import { CategoryGroupModule } from "./category-group-module";

export interface UniqueModule {

    uniqueUsers: Array<number>;
    uniqueUsersCount: number;
    module: CategoryGroupModule;
    canAllow: boolean;  
}