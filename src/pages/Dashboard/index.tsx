import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  MenuList,
  MenuListItem,
} from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

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
      </Container>
    </>
  );
};

export default Dashboard;
