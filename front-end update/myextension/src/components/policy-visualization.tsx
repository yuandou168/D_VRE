import React from 'react';
import { Dayjs } from 'dayjs';

interface PolicyVisualizationProps {
    org: string;
    role: string;
    permission: string;
    access_from: Dayjs | null;
    access_to: Dayjs | null;
  }
  
  

const PolicyVisualization: React.FC<PolicyVisualizationProps> = ({org, role, permission,access_from, access_to}) => {
    let fromValue;
    let toValue;
    if(access_from!==null) {
        fromValue = access_from?.format('YYYY-MM-DD')
    }

    if(access_to!==null) {
        toValue = access_to?.format('YYYY-MM-DD')
    }
    return (
        <div>
        <h2>Mapping Visualizer</h2>
        <p><b>Selected File:</b> {org}</p>
        <p><b>Selected Organization:</b> {org}</p>
        <p><b>Selected Role:</b>{role}</p>
        <p><b>Selected Permission:</b> {permission}</p>
        <p><b>Access From:</b> {fromValue}</p>
        <p><b>Access To:</b> {toValue}</p>



        {/* <p><b>Selected Location:</b> {selectedLocation}</p> */}
      </div>
    )

}

export default PolicyVisualization;