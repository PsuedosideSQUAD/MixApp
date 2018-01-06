import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Mixer"
      subtitle="This is where we could plug in a dashboard to search songs, upload music, etc..."
    />
    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;