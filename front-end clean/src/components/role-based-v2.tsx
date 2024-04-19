import React from 'react';
import ReusableDropdown from './select-dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "@mui/material";


// interface RoleMap {
//   [org: string]: string[];
// }

// interface PermissionMap {
//   [role: string]: string[];
// }

const organizations: string[] = ['Org1', 'Org2', 'Org3'];
const roles: string[] = ['Role1', 'Role2', 'Role3', 'Role4', 'Role5']
const permissions: string[] = ['Permission1', 'Permission2', 'Permission3', 'Permission4', 'Permission5']


const RoleBased: React.FC = () => {
    
  return (
    <div>
      <div className='inline-dropdown'>
        <ReusableDropdown options={organizations} label='Select Organization'/>
        <ReusableDropdown options={roles} label='Select Roles' />
        <ReusableDropdown options={permissions} label='Select Permissions'/>
        <Button variant="contained" color="success" size="small">Save</Button>
        
      </div>
      {/* <div>
        <h2>Mapping Visualizer</h2>
        <p>Selected Organization: {selectedOrg}</p>
        <p>Selected Role: {selectedRole}</p>
        <p>Selected Permission: {selectedPermission}</p>
      </div> */}
    </div>
  );
};

export default RoleBased;
