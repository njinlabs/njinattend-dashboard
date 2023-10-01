import { LocationType } from "./location";
import { UserType } from "./user";

export type AttendanceType = {
  id: number;
  user_id: number;
  user?: Partial<UserType>;
  in_location?: Partial<LocationType>;
  out_location?: Partial<LocationType>;
  period: string;
  in_record?: string | null;
  out_record?: string | null;
};
