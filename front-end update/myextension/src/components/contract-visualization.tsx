import React from 'react';
import { Paper, Typography } from '@material-ui/core';

interface ContractDetails {
  groupName: string;
  permissions: string;
  countries: string[];
  organizations: string[];
}

interface Props {
  selectedContract: ContractDetails | null;
}

const ContractVisualization: React.FC<Props> = ({ selectedContract }) => {
  return (
    <div>
      {selectedContract && (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Selected Contract Details
          </Typography>
          <div style={{ padding: '10px' }}>
            <Typography variant="body1">
              <strong>Group Name:</strong> {selectedContract.groupName}
            </Typography>
            <Typography variant="body1">
              <strong>Permission:</strong> {selectedContract.permissions}
            </Typography>
            <Typography variant="body1">
              <strong>Countries:</strong> {selectedContract.countries.join(', ')}
            </Typography>
            <Typography variant="body1">
              <strong>Organizations:</strong> {selectedContract.organizations.join(', ')}
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default ContractVisualization;
