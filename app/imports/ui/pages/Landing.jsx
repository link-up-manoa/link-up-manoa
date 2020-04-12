import React from 'react';
import { Grid, Icon, Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className={'landing-background'}>
          <Grid container centered stackable columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size={'huge'} name={'handshake'} inverted/>
              <Header inverted as={'h1'} >Meet Like Minded Students</Header>
              <Header as={'h3'} inverted>This app allows users to find other
              students who are in similar classes.</Header>
            </Grid.Column>

            <Grid.Column textAlign={'center'}>
              <Icon size={'huge'} name={'users'} inverted/>
              <Header inverted as={'h1'} >Create Study Groups</Header>
              <Header as={'h3'} inverted>When you find others who are helpful,
              you can create study groups and sessions to get together and help each other</Header>
            </Grid.Column>

            <Grid.Column textAlign={'center'}>
              <Icon inverted size={'huge'} name={'calendar alternate outline'} />
              <Header inverted as={'h1'} >Schedule Sessions</Header>
              <Header as={'h3'} inverted>Keep your scheduled study sessions
              organized in our integrated calendar</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
