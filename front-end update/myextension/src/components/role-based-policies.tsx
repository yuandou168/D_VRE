import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

interface RoleMap {
  [org: string]: string[];
}

interface PermissionMap {
  [role: string]: string[];
}


interface RoleBasedSelectionProps {
  selectedOrg: string;
  selectedRole: string;
  selectedPermission: string;
  setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPermission: React.Dispatch<React.SetStateAction<string>>;
}

const organizations: string[] = ['Org1', 'Org2', 'Org3'];
const roles: RoleMap = {
  Org1: ['Role1', 'Role2'],
  Org2: ['Role3', 'Role4'],
  Org3: ['Role5', 'Role6'],
};
const permissions: PermissionMap = {
  Role1: ['Permission1', 'Permission2'],
  Role2: ['Permission3', 'Permission4'],
  Role3: ['Permission5', 'Permission6'],
  Role4: ['Permission7', 'Permission8'],
  Role5: ['Permission9', 'Permission10'],
  Role6: ['Permission11', 'Permission12'],
};

const RoleBasedSelection: React.FC<RoleBasedSelectionProps> = ({
  selectedOrg,
  selectedRole,
  selectedPermission,
  setSelectedOrg,
  setSelectedRole,
  setSelectedPermission,
}) => {
  return (
    <div>
      <div className="dropdown">
        <select value={selectedOrg} onChange={e => setSelectedOrg(e.target.value)}>
          <option value="">Select Organization</option>
          {organizations.map(org => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
          <option value="">Select Role</option>
          {selectedOrg && roles[selectedOrg].map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select value={selectedPermission} onChange={e => setSelectedPermission(e.target.value)}>
          <option value="">Select Permission</option>
          {selectedRole && permissions[selectedRole].map(permission => (
            <option key={permission} value={permission}>
              {permission}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoleBasedSelection;
