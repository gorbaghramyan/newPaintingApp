import {ICircle} from "./circle.interface";

export interface IProject {
  username: string;
  id: string;
  name: string;
  circles: ICircle[];
}
