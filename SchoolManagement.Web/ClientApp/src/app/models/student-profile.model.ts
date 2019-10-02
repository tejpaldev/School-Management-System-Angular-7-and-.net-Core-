import { Parent } from './parent';
import { Student } from './student';
import { Fee } from './fee.model';
export interface StudentProfile {
    Student: Student,
    Parents: Array<Parent>,
    Fees: Array<Fee>
}
