import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Report,
  Container,
  Header,
  HeaderContent,
  Profile,
  MenuList,
  MenuListItem,
} from './styles';

interface Report {
  id: string;
  problem_id: string;
  user_id: string;
  employe_id: string;
  description: string;
  status: boolean;
}

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { signOut, user } = useAuth();
  const [reports, setReports] = useState<Report>([]);

  useEffect(() => {
    api
      .get<Report[]>('/reports', {
        params: {
          employe_id: user.id,
        },
      })
      .then(response => {
        setReports(response);
      });
  }, []);

  return (
    <>
      <CssBaseline />
      <Container>
        <Header>
          <HeaderContent>
            {/* <img src={logoImg} alt="Support" /> */}

            <Profile>
              <div>
                <strong>{user.name}</strong>
              </div>
            </Profile>

            <MenuList>
              <MenuListItem>
                <Link to="/">Chamados</Link>
              </MenuListItem>
              <MenuListItem>
                <Link to="/">Abrir Chamado</Link>
              </MenuListItem>
            </MenuList>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        {reports.map(report => (
              <Report key={report.id}>
                <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {report.problem_id}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Report>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
