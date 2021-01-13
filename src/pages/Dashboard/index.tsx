/* eslint-disable camelcase */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Report,
  Container,
  Header,
  HeaderContent,
  Profile,
  MenuList,
  MenuListItem,
  InsideCard,
  CardsContainer,
} from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface Report {
  id: string;
  problem_id: string;
  user_id: string;
  created_at: string;
  employe_id: string;
  description: string;
  status: boolean;
  userReports: {
    name: string;
  };
  reportProblem: {
    name: string;
  };
}

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 650,
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
  const { signOut, user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    api
      .get<Report[]>('/reports', {
        params: {
          employe_id: user.id,
        },
      })
      .then(response => {
        setReports(response.data);
      });
  }, [user.id]);

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
                <Link to="/report">Abrir Chamado</Link>
              </MenuListItem>
            </MenuList>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>
        <CardsContainer>
          {reports.map(report => (
            <Report key={report.id}>
              <Card className={classes.root}>
                <CardContent style={{ flexDirection: 'column' }}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {report.created_at}
                  </Typography>
                  <InsideCard>
                    <Typography variant="h5" component="h2">
                      {report.userReports.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {report.reportProblem.name}
                    </Typography>
                    {report.status === true && (
                      <Typography variant="h5" component="h2">
                        Status: Encerrado
                      </Typography>
                    )}
                    {report.status === false && (
                      <Typography variant="h5" component="h2">
                        Status: Aberto
                      </Typography>
                    )}
                  </InsideCard>
                </CardContent>
                <CardActions>
                  <Link to={`/editreport/${report.id}`}>
                    <Button size="small">Editar</Button>
                  </Link>
                </CardActions>
              </Card>
            </Report>
          ))}
        </CardsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
