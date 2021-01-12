/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Content from '@material-ui/core/Container';
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
  FormContainer
} from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ReportFormData {
  problem_id: string;
  user_id: string;
  employe_id: string;
  description: string;
  status: boolean;
}

interface Problem {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

const NewReport: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signOut, user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  const handleSubmit = useCallback(async (data: ReportFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        problem: Yup.string().required('Problema obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
        description: Yup.string().required('Nome obrigatório'),
        message: Yup.string().required('Nome obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { problem_id, user_id, employe_id, description, status } = data;

      const formData = {
        problem_id,
        user_id,
        employe_id: user.id,
        description,
        status: false,
      };

      const response = await api.put('/report', formData);

      // history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
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
        <FormContainer>
          <FormContent>
            <Form
              ref={formRef}
              // initialData={{
              //   name: user.name,
              //   email: user.email,
              // }}
              onSubmit={handleSubmit}
            >
              <Autocomplete
                id="problem"
                options={problems}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Problema" variant="outlined" />
                )}
              />

              <Autocomplete
                id="name"
                options={users}
                getOptionLabel={option => (option.name + option.id)}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Usuário" variant="outlined" />
                )}
              />

              <TextField
                id="description"
                label="Descrição"
                placeholder="Placeholder"
                multiline
                variant="outlined"
              />

              <TextField id="message" label="Mensagem" variant="outlined" />

              <Button type="submit" variant="contained" color="primary">
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
