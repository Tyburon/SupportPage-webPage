/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  FormContent,
  Container,
  Header,
  HeaderContent,
  Profile,
  MenuList,
  MenuListItem,
  FormContainer,
} from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ReportFormData {
  problem_id: string;
  user_id: string;
  employe_id: string;
  description: string;
}

interface Problem {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewReport: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signOut, user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(null);
  const [problemId, setProblemId] = useState<Problem>();
  const [description, setDescription] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    api.get<Problem[]>('/problems').then(response => {
      setProblems(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<User[]>('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        console.log('Data: ');
        console.log(description);

        // const schema = Yup.object().shape({
        //   problem: Yup.string().required('Problema obrigatório'),
        //   name: Yup.string().required('Nome obrigatório'),
        //   description: Yup.string().required('Descrição obrigatório'),
        //   message: Yup.string(),
        // });

        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        const formData = {
          problem_id: data.problem_id,
          user_id: data.user_id,
          employe_id: user.id,
          description: data.description,
          status: false,
        };

        console.log(formData);

        console.log('passouaqui');
        await api.put('/report', formData);
        console.log('passouaqui');

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [user.id],
  );

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
        <FormContainer>
          <FormContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Autocomplete
                id="problem"
                options={problems}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                onChange={(event: any, newValue: string | null) => {
                  setValue(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="problem_id"
                    label="Problema"
                    variant="outlined"
                  />
                )}
              />

              <Autocomplete
                id="name"
                options={users}
                getOptionLabel={option => `${option.name} -  id: ${option.id}`}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="user_id"
                    label="Usuário"
                    variant="outlined"
                  />
                )}
              />

              <TextField
                name="description"
                id="description"
                label="Descrição"
                placeholder="Placeholder"
                multiline
                variant="outlined"
              />

              <TextField
                name="message"
                id="message"
                label="Mensagem"
                variant="outlined"
              />

              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Abrir Chamado
              </Button>
            </Form>
          </FormContent>
        </FormContainer>
      </Container>
    </>
  );
};

export default NewReport;
