import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';

//interface for sub-departments
interface SubDepartment {
  name: string;
  selected: boolean;
}

//interface for departments
interface Department {
  department: string;
  selected: boolean;
  sub_departments: SubDepartment[];
}

const DepartmentData: React.FC = () => {

  //state to keep track of expanded department indices
  const [expanded, setExpanded] = useState<number[]>([]);

  //state to store departments and sub-departments data
  const [departmentsData, setDepartmentsData] = useState<Department[]>([
    {
      department: 'customer_service',
      selected: false,
      sub_departments: ['support', 'customer_success'].map((name) => ({
        name,
        selected: false,
      })),
    },
    {
      department: 'design',
      selected: false,
      sub_departments: ['graphic_design', 'product_design', 'web_design'].map((name) => ({
        name,
        selected: false,
      })),
    },
  ]);
    

//function to handle selection of a department or sub-department
  const handleDepartmentSelect = (departmentIndex: number, subDepartmentIndex: number | null) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setDepartmentsData(() => {
      const updatedDepartmentsData = departmentsData.map((department, depIndex) => {
        if (depIndex !== departmentIndex) return department;
  
        const updatedSubDepartments = department.sub_departments.map((subDepartment, subDepIndex) => {
          if (subDepartmentIndex === null) {
            return {
              ...subDepartment,
              selected: e.target.checked,
            };
          }
          if (subDepIndex !== subDepartmentIndex) return subDepartment;
          return {
            ...subDepartment,
            selected: e.target.checked,
          };
        });
  
        const allSubDepartmentsSelected = updatedSubDepartments.every((subDepartment) => subDepartment.selected);
  
        return {
          ...department,
          sub_departments: updatedSubDepartments,
          selected: e.target.checked ? allSubDepartmentsSelected : false,
        };
      });
      return updatedDepartmentsData;
    });
  };

//function to handle expansion/collapse of a department
  const handleExpand = (departmentIndex: number) => () => {
    const isExpanded = expanded.includes(departmentIndex);
    setExpanded(isExpanded ? expanded.filter((i) => i !== departmentIndex) : [...expanded, departmentIndex]);
  };

  return (

    <List>
      {departmentsData.map((department, departmentIndex) => (
        <div key={department.department} className='dept-container'>
          <ListItem button onClick={handleExpand(departmentIndex)}>
            <Checkbox
              checked={department.selected}
              onChange={handleDepartmentSelect(departmentIndex, null)}
            />
            <ListItemText primary={department.department} />
          </ListItem>

          <Collapse in={expanded.includes(departmentIndex)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((subDepartment, subDepartmentIndex) => (
                <div className='sub-container'>
                <ListItem key={subDepartment.name} button>

                  <Checkbox
                    checked={subDepartment.selected}
                    onChange={handleDepartmentSelect(departmentIndex, subDepartmentIndex)}
                  />

                  <ListItemText primary={subDepartment.name} />
                </ListItem>
                </div>
              ))}
              
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentData;
